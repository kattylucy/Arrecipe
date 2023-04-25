import { useCallback, useState } from "react";
import styled from "styled-components";
import useGetRecipes from "queries/useGetRecipes";
import { Filters } from "components/filters/Filters";
import { Header } from "./Header";
import { Recipes } from "./Recipes";

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
  const [filters, setFilters] = useState({});
  const { data, isLoading } = useGetRecipes(filters);

  const createFilters = useCallback(
    (value, label) => {
      setFilters((prevFilters) => ({ ...prevFilters, [label]: value }));
    },
    [setFilters]
  );

  return (
    <>
      <Header />
      <BodyContainer>
        <Filters createFilters={createFilters} filter={{}} sticky />
        <Recipes isLoading={isLoading} recipes={data} />
      </BodyContainer>
    </>
  );
};

export default RecipesPage;
