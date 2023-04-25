import { useCallback, useState } from "react";
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
  const [filters, setFilters] = useState({});
  const { data } = useGetRecipes(filters);

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
        {isEmpty(data) ? (
          <p style={{ margin: "0 auto" }}>No recipes found</p>
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
