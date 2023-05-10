import { useState, useRef, useCallback } from "react";
import styled from "styled-components";
import theme from "theme/theme";
import useOutsideClick from "hooks/useOutsideClick";
import { Button } from "components/button/Button";
import { Icon } from "components/icon/Icon";

interface KebabMenuProps {
  options: Array<{ name: string; id: string; event: () => void }>;
}

const KebabContainer = styled.div(({ theme: { colors } }) => ({
  position: "relative",
}));

const Dropdown = styled.div(({ theme: { colors } }) => ({
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
  width: 120,
  zIndex: 9,
  "& > button:first-of-type": {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  "& > button:last-of-type": {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
}));

const Arrow = styled.div(({ theme: { colors } }) => ({
  borderLeft: "5px solid transparent",
  borderRight: "5px solid transparent",
  borderBottom: `5px solid #e2e8f06e`,
  boxShadow: colors.boxShadow,
  height: 0,
  position: "absolute",
  right: 12,
  width: 0,
}));

export const KebabMenu = ({ options }: KebabMenuProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setIsVisible] = useState(false);
  useOutsideClick(ref, () => setIsVisible(false));

  const onClick = useCallback(
    (event) => {
      event();
      setIsVisible(false);
    },
    [setIsVisible]
  );

  return (
    <KebabContainer>
      <Button onClick={() => setIsVisible(!visible)} variant="icon" withHover>
        <Icon icon="kebab" />
      </Button>
      {visible && (
        <>
          <Arrow />
          <Dropdown ref={ref}>
            {options.map((menuItem) => {
              return (
                <Button
                  styles={{
                    textAlign: "start",
                    padding: 8,
                    color:
                      menuItem.name === "Delete"
                        ? theme.colors.warning
                        : theme.colors.black,
                  }}
                  key={menuItem.id}
                  onClick={() => onClick(menuItem.event)}
                  variant="text"
                  withHover
                >
                  {menuItem.name}
                </Button>
              );
            })}
          </Dropdown>
        </>
      )}
    </KebabContainer>
  );
};
