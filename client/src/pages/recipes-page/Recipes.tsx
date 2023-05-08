import styled from "styled-components";
import isEmpty from "lodash/isEmpty";
import { AnimatePresence } from "framer-motion";
import { Card } from "components/card/Card";
import { Icon } from "components/icon/Icon";
import { H3 } from "components/UI/Texts";
import { SkeletonLoader } from "./skeleton";

interface RecipesProps {
  isLoading: boolean;
  isMobileView?: boolean;
  recipes:
    | Array<{
        calories: string;
        cookingTime: string;
        id: number;
        url: string;
        name: string;
        thumbnail: string;
        tag: string;
      }>
    | any;
}

const NoResults = styled.div({
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  margin: "auto",
});

const Wrapper = styled.div({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "flex-start",
});

export const Recipes = ({ isLoading, isMobileView, recipes }: RecipesProps) => {
  if (isLoading) {
    return <SkeletonLoader isMobileView={isMobileView} />;
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
    <Wrapper>
      {recipes.map((recipe) => (
        <AnimatePresence key={`${recipe.name}-${recipe.id}`}>
          <Card isMobileView={isMobileView} {...recipe} />
        </AnimatePresence>
      ))}
    </Wrapper>
  );
};
