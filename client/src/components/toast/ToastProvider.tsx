import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { uniqueId } from "lodash";
import { ToastContext } from "./ToastContext";
import { Toast } from "./Toast";

interface Props {
  children: React.ReactNode;
}

type Toast = {
  id: number;
  message: string;
  type: string;
};

export const ToastProvider = ({ children, ...props }: Props) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const open = useCallback(
    (toast: Toast) => {
      const id = Number(uniqueId());
      const { message, type } = toast;
      setToasts((prevToasts) => [...prevToasts, { id, message, type }]);
    },
    [setToasts]
  );

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
            <Toast key={toast.id} close={close} {...toast} />
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
};
