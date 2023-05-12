import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import ReactDOM from "react-dom";
import styled from "styled-components";
import useOutsideClick from "hooks/useOutsideClick";
import { H3 } from "components/UI/Texts";
import { Icon } from "components/icon/Icon";
import { Button } from "components/button/Button";

const defaultProps = {
  width: "30%",
};

const dropIn = {
  hidden: {
    width: 0,
  },
  visible: {
    width: "30%",
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    width: 0,
  },
};

interface ModalProps {
  closeModal: () => void;
  children: any;
  title: string;
  styles: React.CSSProperties;
  visible: boolean;
  width?: string;
}

const ModalContainer = styled(motion.div)({
  backgroundColor: "rgba(0,0,0,0.5)",
  bottom: 0,
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 2,
});

const ModalBody = styled(motion.div)<{
  styles: React.CSSProperties;
  width?: string;
}>(({ theme: { colors, media }, styles, width }) => ({
  background: colors.white,
  borderRadius: 16,
  left: "50%",
  position: "absolute",
  transform: "translate(-50%, -50%)",
  top: "50%",
  overflow: "auto",
  "::-webkit-scrollbar": {
    display: "none",
  },
  [media.tablet]: {
    width: "90%",
  },
  ...styles,
}));

const Header = styled.div(({ theme: { colors } }) => ({
  alignItems: "center",
  borderBottom: colors.border,
  display: "flex",
  justifyContent: "space-between",
  padding: 14,
}));

export const Modal = ({
  closeModal,
  children,
  title,
  styles,
  visible,
  width,
}: ModalProps) => {
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, closeModal);

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "initial";
    }
  }, [visible]);

  if (visible) {
    return ReactDOM.createPortal(
      <>
        <ModalContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <ModalBody
            className="modal orange-gradient"
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            ref={ref}
            styles={styles}
            width={width}
          >
            <Header>
              <H3>{title}</H3>
              <Button onClick={closeModal} variant="icon">
                <Icon icon="closed" styles={{ width: 16, height: 16 }} />
              </Button>
            </Header>
            {children}
          </ModalBody>
        </ModalContainer>
      </>,
      document.querySelector("#modal-root")!
    );
  } else return null;
};

Modal.defaultProps = defaultProps;
