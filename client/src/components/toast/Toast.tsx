import { useEffect } from "react";
import styled from "styled-components";
import { Label, H3 } from "components/UI/Texts";
import { Button } from "components/button/Button";
import { Icon } from "components/icon/Icon";

interface ToastProps {
  close: (id: number) => void;
  id: number;
  message: string;
  type: string;
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
  display: "flex",
  alignItems: "center",
  minWidth: "20vw",
}));

const CloseButton = styled.div({
  marginLeft: 12,
});

const Message = styled.div(({ theme: { colors } }) => ({
  width: "90%",
  borderLeft: `5px solid ${colors.main}`,
  paddingLeft: 12,
}));

export const Toast = ({ close, message, type, id, ...props }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      close(id);
    }, 5000);
    return clearTimeout(timer);
  }, [id, close]);
  return (
    <ToastContainer {...props}>
      <Message>
        <H3 fontWeight={600}>{type === "success" ? "Success!" : "Error"}</H3>
        <Label size="small">{message}</Label>
      </Message>
      <CloseButton>
        <Button onClick={() => close(id)} variant="icon">
          <Icon icon="closed" styles={{ width: 12, height: 12 }} />
        </Button>
      </CloseButton>
    </ToastContainer>
  );
};
