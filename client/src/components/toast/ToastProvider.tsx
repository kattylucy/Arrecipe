import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { uniqueId } from "lodash";
import { ToastContext } from "./ToastContext";
import { Toast } from "./Toast";

interface Props {
  children: React.ReactNode;
}

interface ToastContent {
  id: number;
  content: string;
}

export const ToastProvider = ({ children, ...props }: Props) => {
  const [toasts, setToasts] = useState<ToastContent[]>([]);

  const open = (content: string) =>
    setToasts((currentToasts) => [
      ...currentToasts,
      { id: Number(uniqueId()), content },
    ]);

  const close = (id: number) => {
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id)
    );
  };

  const contextValue = { open };

  return (
    <ToastContext.Provider value={contextValue} {...props}>
      {children}
      {createPortal(
        <div className="toasts-wrapper">
          {toasts.map((toast) => (
            <Toast key={toast.id} close={close} id={toast.id}>
              {toast.content}
            </Toast>
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
};
