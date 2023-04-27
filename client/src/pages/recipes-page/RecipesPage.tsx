import { useCallback, useState } from "react";
import styled from "styled-components";
import useGetRecipes from "queries/useGetRecipes";
import { Filters } from "components/filters/Filters";
import useWindowDimensions from "hooks/useWindowDimensions";
import { Header } from "./Header";
import { Recipes } from "./Recipes";

const BodyContainer = styled.div({
  display: "flex",
});

const MobileView = styled.div({});

const RecipesPage = () => {
  const [filters, setFilters] = useState({
    caloriesCount: 0,
    cookingTime: 0,
    tags: {},
    query: "",
  });
  const { data, isLoading } = useGetRecipes(filters);
  const [isMobileView] = useWindowDimensions();

  const createFilters = useCallback(
    (value: any, label: string) => {
      setFilters((prevFilters) => ({ ...prevFilters, [label]: value }));
    },
    [setFilters]
  );

  if (isMobileView) {
    return (
      <MobileView>
        <Header />
        <Recipes
          isMobileView={isMobileView}
          isLoading={isLoading}
          recipes={data}
        />
        <Filters
          createFilters={createFilters}
          isMobileView={isMobileView}
          filters={filters}
          sticky
        />
      </MobileView>
    );
  }

  return (
    <>
      <Header />
      <BodyContainer>
        <Filters createFilters={createFilters} filters={filters} sticky />
        <Recipes isLoading={isLoading} recipes={data} />
      </BodyContainer>
    </>
  );
};

export default RecipesPage;
