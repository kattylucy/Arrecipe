import { useCallback, useState, useEffect, useRef, useMemo } from "react";
import styled from "styled-components";
import flatMap from "lodash/flatMap";
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
  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useGetRecipes(filters);
  const ref = useRef(null);
  const [isMobileView] = useWindowDimensions();
  const recipeList = useMemo(
    () => (data?.pages ? flatMap(data.pages) : []),
    [data]
  );

  const createFilters = useCallback(
    (value: any, label: string) => {
      setFilters((prevFilters) => ({ ...prevFilters, [label]: value }));
    },
    [setFilters]
  );

  useEffect(() => {
    if (ref.current) {
      const { scrollTop, scrollHeight, clientHeight } = ref.current;
      if (
        scrollTop + clientHeight === scrollHeight &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage();
      }
    }
  }, [ref, fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isMobileView) {
    return (
      <MobileView ref={ref}>
        <Header />
        <Recipes
          isMobileView={isMobileView}
          isLoading={isLoading}
          recipes={recipeList}
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
      <BodyContainer ref={ref}>
        <Filters createFilters={createFilters} filters={filters} sticky />
        <Recipes isLoading={isLoading} recipes={recipeList} />
      </BodyContainer>
    </>
  );
};

export default RecipesPage;
