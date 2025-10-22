# Modal Component for React (HRNet)

A lightweight and accessible modal component for React applications.  
Built with a focus on usability, accessibility, and clean integration via React portals.

---

## Installation

If you plan to publish this component as an npm package:

```bash
npm install react-modal-hrnet-oc
```

Otherwise, copy the `Modal/` folder directly into your `src/components/` directory.

---

## Usage

```jsx
import { useState } from "react";
import Modal from "./components/Modal";

function Example() {
  const [open, setOpen] = useState(false);

  return (
    <main>
      <button onClick={() => setOpen(true)}>Open Modal</button>

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Employee Created"
        footer={<button onClick={() => setOpen(false)}>Close</button>}
      >
        <p>The employee has been created successfully.</p>
      </Modal>
    </main>
  );
}
```

---

## Props

| Name | Type | Default | Description |
|------|------|----------|-------------|
| **isOpen** | `boolean` | `false` | Controls whether the modal is visible. |
| **onClose** | `function` | — | Function called when the modal should close (click outside, Escape key, close button). |
| **title** | `string` or `ReactNode` | — | Modal title, announced by screen readers. |
| **children** | `ReactNode` | — | Main modal content. |
| **footer** | `ReactNode` | — | Optional footer area for action buttons. |
| **closeOnOverlay** | `boolean` | `true` | Close the modal when clicking outside. |
| **closeOnEsc** | `boolean` | `true` | Close the modal when pressing the Escape key. |
| **showCloseButton** | `boolean` | `true` | Display the top-right close button. |
| **size** | `"sm" | "md" | "lg" | number` | `"md"` | Maximum width of the modal. |
| **initialFocusRef** | `React.Ref` | — | Element to focus when the modal opens. |
| **className** | `string` | `""` | Additional CSS classes applied to the modal dialog. |

---

## Accessibility

- The component uses `role="dialog"` and `aria-modal="true"`.  
- Focus is trapped inside the modal while open.  
- Pressing `Escape` or clicking the overlay triggers `onClose`.  
- Focus returns to the previously focused element after closing.  

---

## Styling

The component styles are defined in `Modal.css`.  
You can customize them by overriding the default CSS classes:

```css
.hrn-modal__overlay { /* full-screen overlay */ }
.hrn-modal__dialog { /* modal box */ }
.hrn-modal__header { /* header area */ }
.hrn-modal__title { /* title element */ }
.hrn-modal__close { /* close button */ }
.hrn-modal__body { /* main content area */ }
.hrn-modal__footer { /* footer area */ }
```

Example:

```css
.customModal .hrn-modal__dialog {
  background-color: #f9f9f9;
  border-radius: 8px;
}
```

Usage:

```jsx
<Modal className="customModal" ... />
```

---