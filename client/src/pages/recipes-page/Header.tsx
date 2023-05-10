import styled from "styled-components";
import { Icon } from "components/icon/Icon";
import { Tabs } from "components/tabs/Tabs";
import { Button } from "components/button/Button";
import useModal from "hooks/useModal";
import useWindowDimensions from "hooks/useWindowDimensions";
import { RecipeModal } from "components/recipe-modal/RecipeModal";

const TabContent = [
  {
    disabled: false,
    icon: "recipes",
    iconActive: "recipesMain",
    label: "Recipes",
  },
  {
    disabled: true,
    icon: "calendar",
    iconActive: "calendar",
    label: "Calendar",
  },
];

const NavBarContainer = styled.div(({ theme: { colors, media } }) => ({
  alignItems: "center",
  background: colors.white,
  borderTop: "none",
  boxShadow: colors.boxShadow,
  borderBottomRightRadius: 16,
  borderBottomLeftRadius: 16,
  display: "flex",
  justifyContent: "space-between",
  padding: "16px 24px",
  position: "sticky",
  top: 0,
  zIndex: 1,
  [media.tablet]: {
    boxShadow: "none",
    borderRadius: 0,
    position: "initial",
  },
}));

const CreateRecipe = styled.div(({ theme: { media } }) => ({
  alignItems: "center",
  border: `1px solid rgba(0, 0, 0, 0.15)`,
  borderRadius: 32,
  display: "flex",
  justifyContent: "center",
  padding: "0px 20px",
  "& > img": {
    width: 16,
    height: 16,
    marginLeft: 4,
  },
  [media.tablet]: {
    border: "none",
    "& > img": {
      width: 20,
      height: 20,
    },
  },
}));

const Logo = styled.div({
  alignItems: "center",
  display: "flex",
});

export const Header = () => {
  const [visible, openModal, closeModal] = useModal();
  const [isMobileView] = useWindowDimensions();
  return (
    <NavBarContainer>
      <a href="/">
        <Logo>
          <Icon icon="logo" />
          <Icon
            icon="letter"
            styles={{ height: 32, width: 86, marginLeft: 4, marginTop: 6 }}
          />
        </Logo>
      </a>
      {!isMobileView && <Tabs tabContent={TabContent} />}
      <CreateRecipe>
        <Button
          onClick={openModal}
          styles={{ border: "none", height: 46, fontWeight: 500 }}
        >
          New recipe
        </Button>
        <Icon icon="plus" />
      </CreateRecipe>
      <RecipeModal closeModal={closeModal} visible={visible} />
    </NavBarContainer>
  );
};
