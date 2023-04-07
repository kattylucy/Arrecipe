import styled from "styled-components";
import { Icon } from "components/icon/Icon";
import { useCallback, useState } from "react";

const SearchBarContainer = styled.div({
  alignItems: "center",
  background: "rgba(21, 21, 21, 0.065)",
  borderRadius: 32,
  cursor: "pointer",
  display: "flex",
  justifyContent: "space-between",
  padding: "8px 8px 8px 20px",
  margin: 20,
});

const Input = styled.input(({ theme: { colors }}) => ({
  background: "none",
  border: "none",
  color: colors.black,
  fontSize: 14,
  outline: "none",
  "::placeholder": {
    opacity: 0.4
  },
}));

const SearchIcon = styled.div(({ theme: { colors } }) => ({
  alignItems: "center",
  background: colors.main,
  borderRadius: 30,
  display: "flex",
  padding: 12,
}));

export const SearchButton = () => (
  <SearchIcon>
    <Icon icon="search" styles={{ width: 16, height: 16 }} />
  </SearchIcon>
);

export const SearchBar = () => {
  const [inputVal, setInputVal] = useState();

  const onChange = useCallback((e) => {
    setInputVal(e.target.value);
  }, []);

  return (
    <SearchBarContainer>
      <Input
        onChange={onChange}
        placeholder="Search recipes..."
        value={inputVal}
      />
      <SearchButton />
    </SearchBarContainer>
  );
};
