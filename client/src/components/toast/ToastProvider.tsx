import { useState } from "react";
import { createPortal } from "react-dom";
import { ToastContext } from "./ToastContext";
import { Toast } from "./Toast";

interface Props {
  children: React.ReactNode;
}

interface ToastContent {
  id: number;
  content: string;
}

// Create a random ID
const generateUEID = () => {
  let first: number = (Math.random() * 46656) | 0;
  let second: number = (Math.random() * 46656) | 0;
  first = parseFloat(("000" + first.toString(36)).slice(-3));
  second = parseFloat(("000" + second.toString(36)).slice(-3));

  return first + second;
};

export const ToastProvider = ({ children, ...props }: Props) => {
  const [toasts, setToasts] = useState<ToastContent[]>([]);

  const open = (content: string) =>
    setToasts((currentToasts) => [
      ...currentToasts,
      { id: generateUEID(), content },
    ]);

  const close = (id: number) =>
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id)
    );

  const contextValue = { open };

  return (
    <ToastContext.Provider value={contextValue} {...props}>
      {children}
      {createPortal(
        <div className="toasts-wrapper">
          {toasts.map((toast) => (
            <Toast key={toast.id} close={() => close(toast.id)}>
              {toast.content}
            </Toast>
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
};
