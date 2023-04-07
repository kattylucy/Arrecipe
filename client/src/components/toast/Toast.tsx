import styled from "styled-components";
import { Label } from "components/UI/Texts";
import { useTimeout } from "hooks/useTimeout";

interface ToastProps {
  close: () => void;
  children: React.ReactNode;
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
}));

export const Toast = ({ close, children, ...props }: ToastProps) => {
  useTimeout(close, 5000);
  return (
    <ToastContainer {...props}>
      <Label>{children}</Label>
    </ToastContainer>
  );
};
