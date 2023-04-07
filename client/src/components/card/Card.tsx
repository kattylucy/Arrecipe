import styled from "styled-components";
import uniqueId from "lodash/uniqueId";
import { KebabMenu } from "components/kebab-menu/KebabMenu";
import { Button } from "components/button/Button";
import { Icon } from "components/icon/Icon";
import { Label } from "components/UI/Texts";
import placeholder from "./placeholder.jpg";

interface CardProps {
  calories: string;
  cookingTime: string;
  id: number;
  instagramUrl: string;
  name: string;
}

const kebabItems = [
  { name: "Edit", id: uniqueId() },
  { name: "Delete", id: uniqueId() },
];

const CardContainer = styled.div(({ theme: { colors } }) => ({
  borderRadius: 16,
  margin: "18px 0px 0px 18px",
  width: "31%",
}));

const Thumbnail = styled.img({
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
});

const CardIcons = styled.div(({ theme: { colors } }) => ({
  padding: 12,
}));

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
  paddingRight: 10,
  display: "flex",
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
  instagramUrl,
  name,
  ...props
}: CardProps) => {
  return (
    <CardContainer {...props}>
      <Thumbnail src={placeholder} />
      <CardIcons>
        <TopRow>
          <Label
            fontWeight={600}
            textOverflow="ellipsis"
            size="extraSmall"
            overflow="hidden"
            maxWidth={180}
            whiteSpace="nowrap"
          >
            {name}
          </Label>
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
          <Details icon="recipes" label={`Dessert`} opacity="0.5" />
        </BottomRow>
      </CardIcons>
    </CardContainer>
  );
};
