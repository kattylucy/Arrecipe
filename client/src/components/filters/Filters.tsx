import { FiltersBox } from "./FiltersBox";
import { MobileFilters } from "./MobileFilters";

interface FiltersProps {
  createFilters: (value: any, label: string) => void;
  isMobileView?: boolean;
  filters: {
    caloriesCount: number;
    cookingTime: number;
    query: string;
    tags: object;
  };
  sticky?: boolean;
}

export const Filters = ({
  createFilters,
  isMobileView,
  filters,
  sticky,
}: FiltersProps) => {
  if (isMobileView) {
    return <MobileFilters createFilters={createFilters} filters={filters} />;
  }

  return (
    <FiltersBox createFilters={createFilters} sticky={sticky} {...filters} />
  );
};
