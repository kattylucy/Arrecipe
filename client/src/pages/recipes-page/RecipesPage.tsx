import styled from "styled-components";
import isEmpty from "lodash/isEmpty";
import useGetRecipes from "queries/useGetRecipes";
import { Filters } from "components/filters/Filters";
import { Card } from "components/card/Card";
import { Header } from "./Header";

const BodyContainer = styled.div({
  display: "flex",
});

const Cards = styled.div({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
  width: "100%",
});

const RecipesPage = () => {
  const { data, isLoading } = useGetRecipes();

  return (
    <>
      <Header />
      <BodyContainer>
        <Filters sticky />
        {isEmpty(data) ? (
          <p>No recipes found</p>
        ) : (
          <Cards>
            {data.map((recipe) => (
              <Card key={recipe.id} {...recipe} />
            ))}
          </Cards>
        )}
      </BodyContainer>
    </>
  );
};

export default RecipesPage;
