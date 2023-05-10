import { useState, useRef, useCallback } from "react";
import styled from "styled-components";
import theme from "theme/theme";
import useOutsideClick from "hooks/useOutsideClick";
import { Button } from "components/button/Button";
import { InputLabel } from "components/UI/Texts";
import { Icon } from "components/icon/Icon";

interface DropdownMenuProps {
  label?: string;
  options: Array<{ name: string; id: string }>;
  onSelect: (value: { id: string; name: string }) => void;
  placeholder?: string;
  value?: string;
}

const DropdownContainer = styled.div(({ theme: { colors } }) => ({
  position: "relative",
}));

const DropdownWrapper = styled.div(({ theme: { colors } }) => ({
  background: colors.white,
  border: `1px solid #e2e8f0a8`,
  borderRadius: 8,
  boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  position: "absolute",
  right: 0,
  marginTop: 4,
  width: "100%",
  zIndex: 9,
  marginBottom: 12,
  maxHeight: 120,
  overflow: "scroll",
  "& > button:first-of-type": {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  "& > button:last-of-type": {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
}));

const Container = styled.div(({ theme: { colors } }) => ({
  alignItems: "center",
  border: colors.border,
  borderRadius: 12,
  display: "flex",
  padding: 12,
  fontSize: 12,
  justifyContent: "space-between",
  marginTop: 6,
}));

export const Dropdown = ({
  label,
  options,
  onSelect,
  placeholder,
  value,
  ...props
}: DropdownMenuProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const defaultValue = options.filter((option) => option.id === value);
  const [visible, setIsVisible] = useState(false);
  const [selected, setSelected] = useState<{ name: string; id: string }>({
    name: defaultValue[0]?.name || "",
    id: defaultValue[0]?.id || "",
  });

  useOutsideClick(ref, () => setIsVisible(false));

  const select = useCallback(
    (value: { id: string; name: string }) => {
      setSelected(value);
      onSelect(value);
    },
    [onSelect]
  );

  const toggle = useCallback(() => {
    setIsVisible(!visible);
  }, [visible, setIsVisible]);

  return (
    <DropdownContainer onClick={toggle} {...props} ref={ref}>
      <InputLabel>{label}</InputLabel>
      <Container>
        <InputLabel opacity={selected.name ? 1 : 0.4}>
          {selected.name ? selected.name : placeholder}
        </InputLabel>
        <Icon
          icon={visible ? "arrowUp" : "arrowDown"}
          styles={{ width: 12, height: 12 }}
        />
      </Container>
      {visible && (
        <DropdownWrapper>
          {options.map((menuItem) => {
            return (
              <Button
                key={menuItem.id}
                styles={{
                  textAlign: "start",
                  padding: 8,
                  color:
                    menuItem.name === "Delete"
                      ? theme.colors.warning
                      : theme.colors.black,
                }}
                onClick={() => select(menuItem)}
                variant="text"
                withHover
              >
                {menuItem.name}
              </Button>
            );
          })}
        </DropdownWrapper>
      )}
    </DropdownContainer>
  );
};

Dropdown.defaultProps = {
  placeholder: "Select Option",
};
