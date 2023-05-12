import { useCallback } from "react";
import styled from "styled-components";
import { SearchBar } from "components/search-bar/SearchBar";
import { SliderFilter } from "components/slider/SliderFilter";
import { Label } from "components/UI/Texts";
import { Button } from "components/button/Button";

interface FiltersProps {
  createFilters: (value: any, label: string) => void;
  caloriesCount: number;
  cookingTime: number;
  query: string;
  tags: object;
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

const FiltersContainer = styled.div<{ sticky?: boolean }>(
  ({ sticky, theme: { colors, media } }) => ({
    background: colors.white,
    borderRadius: 16,
    boxShadow: colors.boxShadow,
    height: "fit-content",
    position: sticky ? "sticky" : undefined,
    top: sticky ? 100 : undefined,
    marginTop: 20,
    maxWidth: "25%",
    [media.tablet]: {
      maxWidth: "100%",
      boxShadow: "none",
      overflow: "scroll",
      marginTop: 0,
    },
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

export const FiltersBox = ({
  createFilters,
  query,
  caloriesCount,
  cookingTime,
  tags,
  sticky,
}: FiltersProps) => {
  const setDishType = useCallback(
    (dishType: string) => {
      const newObj = { ...tags };
      if (newObj.hasOwnProperty(dishType)) {
        delete newObj[dishType];
      } else {
        newObj[dishType] = dishType;
      }
      createFilters(newObj, "tags");
    },
    [createFilters, tags]
  );

  console.log(caloriesCount > 0);

  return (
    <FiltersContainer sticky={sticky}>
      <SearchBar
        onChange={createFilters}
        placeholder="Search recipes..."
        value={query}
      />
      <Separator />
      <Sliders>
        <SliderFilter
          countingRange={50}
          labels={{
            label: "Kcal per serving",
            sublabel: Number(caloriesCount) > 0 ? `${caloriesCount} Kcal` : "",
          }}
          maxValue={1000}
          minValue={0}
          setSliderValue={(value) => createFilters(value, "caloriesCount")}
        />
        <SliderFilter
          countingRange={5}
          labels={{
            label: "Time to prepare",
            sublabel: Number(cookingTime) > 0 ? `${cookingTime} min` : "",
          }}
          maxValue={120}
          minValue={0}
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
              className={tags[dish.id] ? "selected-btn" : ""}
              key={`${dish.label} - ${index}`}
              onClick={() => setDishType(dish.id)}
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
