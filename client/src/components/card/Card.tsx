import styled from "styled-components";
import uniqueId from "lodash/uniqueId";
import { KebabMenu } from "components/kebab-menu/kebabMenu";
import { Button } from "components/button/Button";
import { Icon } from "components/icon/Icon";
import { Label } from "components/UI/Texts";

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

const kebabItems = [
  { name: "Edit", id: uniqueId() },
  { name: "Delete", id: uniqueId() },
];

const CardContainer = styled.div<{ mobile?: boolean }>(({ mobile }) => ({
  borderRadius: 16,
  margin: mobile ? 20 : "18px 0px 0px 18px",
  width: mobile ? "100%" : "31%",
}));

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
  return (
    <CardContainer mobile={isMobileView} {...props}>
      <a target="_blank" href={url}>
        <Thumbnail url={`data:image/jpeg;base64,${thumbnail}`} />
      </a>
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
          <Details icon="recipes" label={tag} opacity="0.5" />
        </BottomRow>
      </CardIcons>
    </CardContainer>
  );
};
