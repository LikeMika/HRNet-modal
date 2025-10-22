import React, { createRef } from "react";
import { render, screen, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Modal from "./Modal";


function renderModal(uiProps = {}) {
  const onClose = jest.fn();
  const props = {
    isOpen: true,
    onClose,
    title: "Titre de test",
    children: <p>Contenu de la modale</p>,
    footer: <button type="button">Valider</button>,
    ...uiProps,
  };
  const view = render(<Modal {...props} />);
  const dialogs = screen.getAllByRole("dialog", { hidden: true });
  const dialog = dialogs[dialogs.length - 1];
  const overlay = dialog.closest(".hrn-modal__overlay");
  return { ...view, onClose, overlay, dialog };
}

describe("Modal", () => {
  test("ne rend rien quand isOpen=false", () => {
    const { container } = render(<Modal isOpen={false} onClose={() => {}} />);
    expect(container.firstChild).toBeNull();
  });

  test("rend titre, contenu, footer et bouton de fermeture", () => {
    const { dialog } = renderModal();
    expect(dialog).toBeInTheDocument();
    expect(within(dialog).getByRole("heading", { name: "Titre de test" })).toBeInTheDocument();
    expect(within(dialog).getByText("Contenu de la modale")).toBeInTheDocument();
    expect(within(dialog).getByRole("button", { name: "Valider" })).toBeInTheDocument();
    expect(within(dialog).getByRole("button", { name: /close dialog/i })).toBeInTheDocument();
  });

  test("porte les bons attributs d’accessibilité", () => {
    const { dialog } = renderModal();
    expect(dialog).toHaveAttribute("aria-modal", "true");
    const title = within(dialog).getByRole("heading", { name: "Titre de test" });
    expect(dialog.getAttribute("aria-labelledby")).toBe(title.id);
  });

  test("fermeture via le bouton Close", async () => {
    const user = userEvent.setup();
    const { onClose, dialog } = renderModal();
    await user.click(within(dialog).getByRole("button", { name: /close dialog/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test("fermeture via clic overlay (closeOnOverlay=true)", async () => {
    const user = userEvent.setup();
    const { overlay, onClose } = renderModal({ closeOnOverlay: true });
    await user.pointer([{ target: overlay, keys: "[MouseLeft]" }]);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test("ne ferme pas via overlay quand closeOnOverlay=false", async () => {
    const user = userEvent.setup();
    const { overlay, onClose } = renderModal({ closeOnOverlay: false });
    await user.pointer([{ target: overlay, keys: "[MouseLeft]" }]);
    expect(onClose).not.toHaveBeenCalled();
  });

  test("fermeture via touche Escape quand closeOnEsc=true", async () => {
    const user = userEvent.setup();
    const { onClose } = renderModal({ closeOnEsc: true });
    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test("ne ferme pas via Escape quand closeOnEsc=false", async () => {
    const user = userEvent.setup();
    const { onClose } = renderModal({ closeOnEsc: false });
    await user.keyboard("{Escape}");
    expect(onClose).not.toHaveBeenCalled();
  });

  test("focus initial : utilise initialFocusRef si fourni, sinon 1er focusable, sinon le dialog", async () => {
    const user = userEvent.setup();

    // Cas 1: initialFocusRef
    const ref = createRef();
    const { unmount } = render(
      <Modal
        isOpen
        onClose={() => {}}
        title="t"
        initialFocusRef={ref}
        footer={<button type="button">OK</button>}
      >
        <button type="button" ref={ref}>BTNREF</button>
      </Modal>
    );
    await waitFor(() =>
      expect(screen.getByRole("button", { name: "BTNREF" })).toHaveFocus()
    );
    unmount();

    // Cas 2: pas d'initialFocusRef → 1er focusable (Close)
    const r2 = renderModal();
    await waitFor(() =>
      expect(within(r2.dialog).getByRole("button", { name: /close dialog/i })).toHaveFocus()
    );
    r2.unmount();

    // Cas 3: aucun focusable → le dialog reçoit le focus
    const { unmount: unmount3 } = render(
      <Modal isOpen onClose={() => {}} title="t" showCloseButton={false} footer={null}>
        <span>Juste du texte</span>
      </Modal>
    );
    await waitFor(() => {
      const dialogs = screen.getAllByRole("dialog", { hidden: true });
      const last = dialogs[dialogs.length - 1];
      expect(last).toHaveFocus();
    });
    unmount3();
  });

  test("trap de focus avec Tab / Shift+Tab dans le dialog", async () => {
    const user = userEvent.setup();
    render(
      <Modal isOpen onClose={() => {}} title="Trap">
        <button>First</button>
        <a href="#x">Middle link</a>
        <input aria-label="Last input" />
      </Modal>
    );

    const dialog = screen.getAllByRole("dialog", { hidden: true }).pop();
    const closeBtn = within(dialog).getByRole("button", { name: /close dialog/i });
    await waitFor(() => expect(closeBtn).toHaveFocus());

    await user.keyboard("{Tab}");
    expect(within(dialog).getByRole("button", { name: "First" })).toHaveFocus();

    await user.keyboard("{Tab}");
    expect(within(dialog).getByRole("link", { name: "Middle link" })).toHaveFocus();

    await user.keyboard("{Tab}");
    expect(within(dialog).getByRole("textbox", { name: "Last input" })).toHaveFocus();

    await user.keyboard("{Tab}");
    expect(closeBtn).toHaveFocus();

    await user.keyboard("{Shift>}{Tab}{/Shift}");
    expect(within(dialog).getByRole("textbox", { name: "Last input" })).toHaveFocus();
  });

  test("applique le style maxWidth en fonction de la prop size", () => {
    const { dialog, unmount } = renderModal({ size: "sm" });
    expect(dialog).toHaveStyle({ maxWidth: "380px" });
    unmount();

    const r2 = renderModal({ size: "md" });
    expect(r2.dialog).toHaveStyle({ maxWidth: "600px" });
    r2.unmount();

    const r3 = renderModal({ size: "lg" });
    expect(r3.dialog).toHaveStyle({ maxWidth: "900px" });
    r3.unmount();

    const r4 = renderModal({ size: 720 });
    expect(r4.dialog).toHaveStyle({ maxWidth: "720px" });
    r4.unmount();
  });

  test("merge className custom sur le dialog", () => {
    const { dialog } = renderModal({ className: "custom-class" });
    expect(dialog).toHaveClass("custom-class");
    expect(dialog).toHaveClass("hrn-modal__dialog");
  });

  test("masque le scroll du body pendant l’ouverture, puis le restaure à la fermeture", async () => {
    const user = userEvent.setup();
    const { onClose, unmount, dialog } = renderModal();
    expect(document.body.style.overflow).toBe("hidden");
    await user.click(within(dialog).getByRole("button", { name: /close dialog/i }));
    expect(onClose).toHaveBeenCalled();
    unmount();
    await waitFor(() => expect(document.body.style.overflow).toBe(""));
  });

  test("rend le footer uniquement si fourni", () => {
    const r1 = renderModal({ footer: null });
    expect(screen.queryByText("Valider")).not.toBeInTheDocument();
    r1.unmount();
    const r2 = renderModal({ footer: <button>Save</button> });
    expect(within(r2.dialog).getByRole("button", { name: "Save" })).toBeInTheDocument();
    r2.unmount();
  });

  test("le dialog est rendu via portal dans document.body", () => {
    const { dialog } = renderModal();
    expect(document.body.contains(dialog)).toBe(true);
  });
});
