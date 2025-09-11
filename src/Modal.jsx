import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import "./Modal.css";

/**
 * Props deail:
 * - isOpen (bool)
 * - onClose (func)
 * - title (string | node)
 * - children (node)
 * - footer (node)
 * - closeOnOverlay (bool) = true
 * - closeOnEsc (bool) = true
 * - showCloseButton (bool) = true
 * - size ("sm" | "md" | "lg" | number) = "md"
 * - initialFocusRef (ref)
 * - className (string) : classes additionnelles pour la boîte de dialogue
 */
export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  closeOnOverlay = true,
  closeOnEsc = true,
  showCloseButton = true,
  size = "md",
  initialFocusRef,
  className = "",
}) {
  const overlayRef = useRef(null);
  const dialogRef = useRef(null);
  const titleId = useRef(`modal-title-${Math.random().toString(36).slice(2)}`);
  const previouslyFocused = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    previouslyFocused.current = document.activeElement;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTarget =
      initialFocusRef?.current ||
      dialogRef.current?.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) ||
      dialogRef.current;

    // Focus après paint
    const id = requestAnimationFrame(() => focusTarget?.focus());
    return () => {
      cancelAnimationFrame(id);
      document.body.style.overflow = originalOverflow;
      previouslyFocused.current && previouslyFocused.current.focus?.();
    };
  }, [isOpen, initialFocusRef]);
    // gestion du focus au clavier
  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose?.();
      }
      if (e.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const focusable = Array.from(focusables).filter(
          (el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden")
        );
        if (focusable.length === 0) {
          e.preventDefault();
          dialogRef.current.focus();
          return;
        }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown, true);
    return () => document.removeEventListener("keydown", onKeyDown, true);
  }, [isOpen, closeOnEsc, onClose]);

  if (!isOpen) return null;

  const maxWidth =
    typeof size === "number"
      ? `${size}px`
      : size === "sm"
      ? "380px"
      : size === "lg"
      ? "900px"
      : "600px";

      
  // gestion du clic en dehors de la modale
  const handleOverlayMouseDown = (e) => {
    if (!closeOnOverlay) return;
    if (e.target === overlayRef.current) onClose?.();
  };

  return createPortal(
    <div
      ref={overlayRef}
      className="hrn-modal__overlay"
      onMouseDown={handleOverlayMouseDown}
      aria-hidden="true"
    >
      <div
        className={`hrn-modal__dialog ${className}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId.current : undefined}
        style={{ maxWidth }}
        ref={dialogRef}
        tabIndex={-1}
      >
        {(title || showCloseButton) && (
          <div className="hrn-modal__header">
            {title ? (
              <h2 id={titleId.current} className="hrn-modal__title">
                {title}
              </h2>
            ) : (
              <span />
            )}
            {showCloseButton && (
              <button
                type="button"
                className="hrn-modal__close"
                aria-label="Close dialog"
                onClick={onClose}
              >
                ×
              </button>
            )}
          </div>
        )}

        <div className="hrn-modal__body">{children}</div>

        {footer && <div className="hrn-modal__footer">{footer}</div>}
      </div>
    </div>,
    document.body
  );
}
