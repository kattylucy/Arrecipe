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
  justifyContent: "flex-start",
  maxWidth: "75%",
});

const RecipesPage = () => {
  const { data, isLoading } = useGetRecipes();

  // if (isEmpty(data)) return <p>Empty</p>;

  return (
    <>
      <Header />
      <BodyContainer>
        <Filters sticky />
        <Cards>
          {data?.map((recipe) => (
            <Card key={recipe.id} {...recipe} />
          ))}
        </Cards>
      </BodyContainer>
    </>
  );
};

export default RecipesPage;
