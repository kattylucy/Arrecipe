import { InputHTMLAttributes } from "react";
import styled from "styled-components";
import { InputLabel } from "components/UI/Texts";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  placeholder: string;
  onChange: (e: any) => void;
  value: any;
}

const InputContainer = styled.div({
  display: "flex",
  flexDirection: "column",
});

const StyledInput = styled.input(({ theme: { colors } }) => ({
  background: "rgba(21, 21, 21, 0.01)",
  border: colors.border,
  borderRadius: 12,
  height: 56,
  marginTop: 6,
  paddingLeft: 8,
  "::placeholder": {
    color: colors.black,
    opacity: 0.25,
  },
}));

export const TextInput = ({
  id,
  label,
  onChange,
  placeholder,
  value,
  ...props
}: InputProps) => (
  <InputContainer {...props}>
    <InputLabel htmlFor={id}>{label}</InputLabel>
    <StyledInput
      id={id}
      name={label}
      placeholder={placeholder}
      onChange={onChange}
      type="text"
      value={value}
    />
  </InputContainer>
);

const defaultProps = {
  value: "",
};

TextInput.defaultProps = defaultProps;
