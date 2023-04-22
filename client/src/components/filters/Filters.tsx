import { useCallback, useState } from "react";
import styled from "styled-components";
import { SearchBar } from "components/search-bar/SearchBar";
import { SliderFilter } from "components/slider/SliderFilter";
import { Label } from "components/UI/Texts";
import { Button } from "components/button/Button";

interface FiltersProps {
  sticky?: boolean;
}

const types = [
  { label: "Main Dish", id: "main_dish" },
  { label: "Side Dish", id: "side_dish" },
  { label: "Drinks", id: "drinks" },
  { label: "Dessert", id: "dessert" },
];

const buttonStyles = {
  opacity: "0.5",
  padding: "8px 12px",
  width: "46%",
  transition: "opacity .2s ease",
  margin: 4,
  "&.selected-btn": {
    backgroundColor: "black",
    opacity: 1,
    color: "white",
  },
};

const FiltersContainer = styled.div<{ sticky: boolean }>(
  ({ sticky, theme: { colors } }) => ({
    background: colors.white,
    borderRadius: 16,
    boxShadow: colors.boxShadow,
    height: "fit-content",
    position: sticky ? "sticky" : undefined,
    top: sticky ? 100 : undefined,
    marginTop: 20,
    maxWidth: "25%",
  })
);

const Separator = styled.div({
  borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
  margin: "20px 0px",
});

const DishSection = styled.div({
  margin: 20,
});

const Sliders = styled.div({
  margin: 20,
});

const Buttons = styled.div({
  display: "flex",
  justifyContent: "space-between",
  flexWrap: "wrap",
  marginTop: 12,
});

export const Filters = ({ sticky }: FiltersProps) => {
  const [filter, setFilter] = useState<{
    dishTypes: Array<{ label: string; id: string }>;
    calories: number;
    cookingTime: number;
  }>({
    calories: 50,
    cookingTime: 5,
    dishTypes: [],
  });

  const setDishType = useCallback(
    (type) => {
      if (filter.dishTypes.includes(type)) {
        setFilter({
          ...filter,
          dishTypes: filter.dishTypes.filter(
            (dish) => dish.label !== type.label
          ),
        });
      } else {
        setFilter({ ...filter, dishTypes: [...filter.dishTypes, type] });
      }
    },
    [filter, setFilter]
  );

  const createFilters = useCallback(
    (value, label) => {
      setFilter({ ...filter, [label]: value });
    },
    [setFilter, filter]
  );

  return (
    <FiltersContainer sticky={sticky}>
      <SearchBar />
      <Separator />
      <Sliders>
        <SliderFilter
          countingRange={50}
          labels={{
            label: "Kcal per serving",
            sublabel: `${filter.calories} Kcal`,
          }}
          maxValue={1000}
          minValue={50}
          setSliderValue={(value) => createFilters(value, "calories")}
        />
        <SliderFilter
          countingRange={5}
          labels={{
            label: "Time to prepare",
            sublabel: `${filter.cookingTime} min`,
          }}
          maxValue={120}
          minValue={5}
          setSliderValue={(value) => createFilters(value, "cookingTime")}
          style={{ marginTop: 20 }}
        />
      </Sliders>
      <DishSection>
        <Label size="small" fontWeight="600">
          Type of dish
        </Label>
        <Buttons>
          {types.map((dish, index) => (
            <Button
              className={
                filter.dishTypes.filter(
                  (dishFilter) => dishFilter.label == dish.label
                ).length
                  ? "selected-btn"
                  : ""
              }
              key={`${dish.label} - ${index}`}
              onClick={() => setDishType(dish)}
              styles={buttonStyles}
            >
              {dish.label}
            </Button>
          ))}
        </Buttons>
      </DishSection>
    </FiltersContainer>
  );
};
