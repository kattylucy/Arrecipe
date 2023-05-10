import { useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Label, H3 } from "components/UI/Texts";
import { Button } from "components/button/Button";
import { Icon } from "components/icon/Icon";

interface ToastProps {
  close: (id: number) => void;
  id: number;
  message: string;
  type: string;
}

const types = {
  success: "Success!",
  error: "Oh no!",
  info: "We are working",
};

const ToastContainer = styled(motion.div)(({ theme: { colors } }) => ({
  border: `1px solid ${colors.border}`,
  borderRadius: 8,
  boxShadow: "0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px -1px rgba(0,0,0,.1)",
  padding: 12,
  position: "fixed",
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
    <ToastContainer
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.5 }}
      {...props}
    >
      <Message>
        <H3 fontWeight={600}>{types[type]}</H3>
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
