import { useCallback, useMemo } from "react";
import styled from "styled-components";
import uniqueId from "lodash/uniqueId";
import { Tooltip } from "@chakra-ui/react";
import { motion } from "framer-motion";
import useDeleteRecipe from "queries/useDeleteRecipe";
import useModal from "hooks/useModal";
import { useToast } from "hooks/useToast";
import { KebabMenu } from "components/kebab-menu/kebabMenu";
import { Button } from "components/button/Button";
import { Icon } from "components/icon/Icon";
import { Label } from "components/UI/Texts";
import { RecipeModal } from "components/recipe-modal/RecipeModal";
import defaultThumbnail from "../../assets/defaultThumbnail.png";

interface CardProps {
  calories: string;
  cookingTime: string;
  id: number;
  url: string;
  name: string;
  thumbnail: string;
  tag: string;
  isMobileView?: boolean;
}

const CardContainer = styled(motion.div)<{ mobile?: boolean }>(
  ({ mobile }) => ({
    borderRadius: 16,
    margin: mobile ? 20 : "18px 0px 0px 18px",
    width: mobile ? "100%" : "31%",
  })
);

const Thumbnail = styled.div<{ url: string }>(({ url }) => ({
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  backgroundImage: `url(${url})`,
  backgroundSize: "cover",
  height: 350,
  borderRadius: 20,
  "&:hover": {
    opacity: 0.8,
  },
}));

const CardIcons = styled.div({
  padding: 12,
});

const TopRow = styled.div({
  alignItems: "center",
  display: "flex",
  justifyContent: "space-between",
});

const Icons = styled.div({
  display: "flex",
});

const BottomRow = styled.div({
  display: "flex",
  justifyContent: "space-between",
  marginTop: 16,
  "& > div": {
    ":last-of-type": {
      borderRight: "none",
    },
  },
});

const DetailsWrapper = styled.div(({ theme: { colors } }) => ({
  alignItems: "center",
  borderRight: `2px solid ${colors.hoveredBg}`,
  display: "flex",
  width: 90,
}));

const Details = ({ icon, label, opacity }) => (
  <DetailsWrapper>
    <Icon
      icon={icon}
      styles={{
        width: 16,
        height: 16,
        marginRight: 6,
        opacity: opacity,
      }}
    />
    <Label size="extraSmall" fontWeight="600" opacity="0.7">
      {label}
    </Label>
  </DetailsWrapper>
);

export const Card = ({
  calories,
  cookingTime,
  id,
  url,
  name,
  thumbnail,
  tag,
  isMobileView,
  ...props
}: CardProps) => {
  const [visible, openModal, closeModal] = useModal();
  const deleteRecipeHook = useDeleteRecipe();
  const toast = useToast();

  const deleteRecipe = useCallback(async () => {
    try {
      await deleteRecipeHook.mutateAsync(id);
      toast.open({ message: "Recipe was deleted", type: "success" });
    } catch (error) {
      toast.open({ message: error, type: "error" });
    }
  }, [id, deleteRecipeHook]);

  const kebabItems = useMemo(
    () => [
      { name: "Edit", id: uniqueId(), event: () => openModal() },
      { name: "Delete", id: uniqueId(), event: () => deleteRecipe() },
    ],
    [openModal, deleteRecipe]
  );

  return (
    <CardContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      mobile={isMobileView}
      {...props}
    >
      <a target="_blank" href={url}>
        <Thumbnail
          url={
            thumbnail ? `data:image/jpeg;base64,${thumbnail}` : defaultThumbnail
          }
        />
      </a>
      <CardIcons>
        <TopRow>
          <Tooltip hasArrow label={name} isDisabled={name.length > 200}>
            <Label
              fontWeight={600}
              textOverflow="ellipsis"
              size="extraSmall"
              overflow="hidden"
              maxWidth={isMobileView ? "100%" : 200}
              whiteSpace="nowrap"
            >
              {name}
            </Label>
          </Tooltip>
          <Icons>
            <Button disabled variant="icon" withHover>
              <Icon icon="calendarAdd" />
            </Button>
            <KebabMenu options={kebabItems} />
          </Icons>
        </TopRow>
        <BottomRow>
          <Details icon="pie" label={`${calories} Kcal`} opacity="0.6" />
          <Details icon="timer" label={`${cookingTime} min`} opacity="0.3" />
          <Details icon="recipes" label={tag} opacity="0.5" />
        </BottomRow>
      </CardIcons>
      <RecipeModal
        calories={calories}
        cookingTime={cookingTime}
        isEditing
        id={id}
        url={url}
        name={name}
        thumbnail={thumbnail}
        tag={tag}
        closeModal={closeModal}
        visible={visible}
      />
    </CardContainer>
  );
};
