import { HTMLAttributes } from "react";
import styled from "styled-components";

type VariantType = "default" | "icon" | "contained" | "text";
export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  children: React.ReactNode;
  disabled?: boolean;
  styles?: any;
  variant: VariantType;
  withHover?: boolean;
}

const StyledButton = styled.button<{
  styles: any;
  variant: VariantType;
  withHover?: boolean;
}>(({ disabled, theme: { colors }, styles, variant, withHover }) => ({
  alignItems: variant === "icon" ? "center" : undefined,
  background:
    variant === "contained"
      ? colors.black
      : variant === "icon"
      ? "transparent"
      : colors.white,
  borderRadius: variant === "contained" ? 12 : variant === "text" ? 0 : 32,
  border:
    variant === "icon" || variant === "text"
      ? "none"
      : `1px solid rgba(0, 0, 0, 0.15)`,
  color: variant === "contained" ? colors.white : colors.black,
  cursor: disabled ? "not-allowed" : "pointer",
  display: variant === "icon" ? "flex" : undefined,
  padding: withHover ? 6 : 0,
  opacity: disabled ? 0.5 : 1,
  fontSize: 14,
  "& > img": {
    width: 20,
    height: 20,
  },
  ":hover": {
    backgroundColor: withHover && !disabled ? colors.hoveredBg : "none",
  },
  ...styles,
}));

export const Button = ({
  children,
  disabled,
  onClick,
  styles,
  withHover,
  ...props
}: ButtonProps) => {
  return (
    <StyledButton
      disabled={disabled}
      onClick={onClick}
      styles={styles}
      withHover={withHover}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

const defaultProps = {
  variant: "default",
  withHover: false,
};

Button.defaultProps = defaultProps;
