import styled from "styled-components";
import { SearchBar } from "components/search-bar/SearchBar";
import { SliderFilter } from "components/slider/SliderFilter";
import { Label } from "components/UI/Texts";
import { Button } from "components/button/Button";

interface FiltersProps {
  createFilters: (value: string | number, label: string) => void;
  filter: object;
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

export const Filters = ({ createFilters, filter, sticky }: FiltersProps) => {
  return (
    <FiltersContainer sticky={sticky}>
      <SearchBar
        onChange={createFilters}
        placeholder="Search recipes..."
        value={filter.query}
      />
      <Separator />
      <Sliders>
        <SliderFilter
          countingRange={50}
          labels={{
            label: "Kcal per serving",
            sublabel: `${filter.calories_count} Kcal`,
          }}
          maxValue={1000}
          minValue={0}
          setSliderValue={(value) => createFilters(value, "calories_count")}
        />
        <SliderFilter
          countingRange={5}
          labels={{
            label: "Time to prepare",
            sublabel: `${filter.cooking_time} min`,
          }}
          maxValue={120}
          minValue={0}
          setSliderValue={(value) => createFilters(value, "cooking_time")}
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
                filter?.dishTypes?.filter(
                  (dishFilter) => dishFilter.label == dish.label
                ).length
                  ? "selected-btn"
                  : ""
              }
              key={`${dish.label} - ${index}`}
              // onClick={() => setDishType(dish)}
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
