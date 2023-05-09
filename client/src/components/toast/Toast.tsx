import { useEffect } from "react";
import styled from "styled-components";
import { Label } from "components/UI/Texts";

interface ToastProps {
  close: (id: number) => void;
  children: React.ReactNode;
  id: number;
}

const ToastContainer = styled.div(({ theme: { colors } }) => ({
  border: `1px solid ${colors.border}`,
  borderRadius: 8,
  boxShadow: "0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px -1px rgba(0,0,0,.1)",
  padding: 12,
  position: "absolute",
  right: 0,
  margin: 12,
  top: 0,
  zIndex: 99999,
  background: colors.white,
}));

export const Toast = ({ close, children, id, ...props }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => close(id), 5000);
    return () => clearTimeout(timer);
  }, [close, id]);
  return (
    <ToastContainer {...props}>
      <Label>{children}</Label>
    </ToastContainer>
  );
};
