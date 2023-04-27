import { useState } from "react";
import styled from "styled-components";
import theme from "theme/theme";
import { isEmpty, uniqueId } from "lodash";
import { Button } from "components/button/Button";
import { Icon } from "components/icon/Icon";
import { Label } from "components/UI/Texts";

type DirectionType = "horizontal" | "vertical";

interface TabsProps {
  direction: DirectionType;
  defaultActive?: number;
  tabContent: Array<{
    disabled: boolean;
    icon: string;
    iconActive: string;
    label: string;
  }>;
}

const TabsContainer = styled.div<{ direction: DirectionType }>(
  ({ direction }) => ({
    display: "flex",
    flexDirection: direction === "vertical" ? "column" : "row",
  })
);

const styles = {
  "&.tab": {
    borderRadius: 0,
    border: "none",
    borderBottom: "2px solid transparent",
    opacity: 0.6,
    position: "relative",
    transition: "opacity .3s ease",
    margin: "0px 12px",
    height: 46,
    "& > img": {
      marginRight: 6,
    },
  },
  "&.active": {
    fontWeight: 600,
    opacity: 1,
    "& > span": {
      bottom: "-20px",
      borderBottom: `2px solid ${theme.colors.main}`,
      position: "absolute",
      width: "100%",
    },
  },
};

export const Tabs = ({ defaultActive, tabContent, ...props }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultActive);

  if (isEmpty(tabContent)) return null;

  return (
    <TabsContainer {...props}>
      {tabContent.map((tab, index) => {
        const id = uniqueId(`${tab.label}`);
        const isActive = activeTab === index;
        return (
          <Button
            active={isActive}
            className={isActive ? "active tab" : "tab"}
            disabled={tab.disabled}
            key={id}
            onClick={() => setActiveTab(index)}
            styles={styles}
            variant="icon"
          >
            <span />
            <Icon icon={isActive ? tab.iconActive : tab.icon} />
            <Label size="small">{tab.label}</Label>
          </Button>
        );
      })}
    </TabsContainer>
  );
};

const defaultProps = {
  defaultActive: 0,
  direction: "horizontal",
};

Tabs.defaultProps = defaultProps;
