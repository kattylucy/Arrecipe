import styled from "styled-components";
import { debounce } from "lodash";
import { useCallback, useState } from "react";

interface SearchProps {
  onChange: (value: string, label: string) => void;
  placeholder: string;
  value: string;
}

const SearchBarContainer = styled.div({
  alignItems: "center",
  background: "rgba(21, 21, 21, 0.065)",
  borderRadius: 32,
  cursor: "pointer",
  display: "flex",
  justifyContent: "space-between",
  padding: "8px 8px 8px 20px",
  margin: 20,
  height: 56,
});

const Input = styled.input(({ theme: { colors } }) => ({
  background: "none",
  border: "none",
  color: colors.black,
  fontSize: 14,
  outline: "none",
  width: "100%",
  "::placeholder": {
    opacity: 0.4,
  },
}));

export const SearchBar = ({ onChange, placeholder }: SearchProps) => {
  const [value, setValue] = useState("");
  const debouncedOnChange = useCallback(
    debounce((value) => {
      onChange(value, "query");
    }, 500),
    [onChange]
  );

  const onSearchChange = useCallback(
    (e) => {
      setValue(e.target.value);
      debouncedOnChange(e.target.value);
    },
    [debouncedOnChange, setValue]
  );

  return (
    <SearchBarContainer>
      <Input
        onChange={onSearchChange}
        placeholder={placeholder}
        value={value}
      />
    </SearchBarContainer>
  );
};
