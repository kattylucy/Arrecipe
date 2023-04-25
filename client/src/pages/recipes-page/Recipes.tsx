import styled from "styled-components";
import isEmpty from "lodash/isEmpty";
import { Card } from "components/card/Card";
import { Icon } from "components/icon/Icon";
import { H3 } from "components/UI/Texts";
import { SkeletonLoader } from "./skeleton";

interface RecipesProps {
  isLoading: boolean;
  recipes: Array<{
    calories: string;
    cookingTime: string;
    id: number;
    url: string;
    name: string;
    thumbnail: string;
    tag: string;
  }>;
}

const NoResults = styled.div({
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  margin: "auto",
});

const Cards = styled.div({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
  width: "100%",
});

export const Recipes = ({ isLoading, recipes }: RecipesProps) => {
  if (isLoading) {
    return <SkeletonLoader />;
  }

  if (isEmpty(recipes)) {
    return (
      <NoResults>
        <Icon icon="empty" styles={{ width: 190, height: 190 }} />
        <H3 opacity="0.2">Ops, nothing here!</H3>
      </NoResults>
    );
  }
  return (
    <Cards>
      {recipes.map((recipe) => (
        <Card key={recipe.id} {...recipe} />
      ))}
    </Cards>
  );
};
