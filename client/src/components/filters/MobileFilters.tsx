import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { Button } from "components/button/Button";
import { Icon } from "components/icon/Icon";
import { FiltersBox } from "./FiltersBox";

interface FiltersProps {
  createFilters: (value: any, label: string) => void;
  filters: {
    caloriesCount: number;
    cookingTime: number;
    query: string;
    tags: object;
  };
}

const FiltersContainer = styled.div(({ theme: { colors } }) => ({
  position: "fixed",
  bottom: 0,
  background: colors.white,
  width: "100%",
  height: 64,
  padding: 16,
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
}));

const SearchButtonContainer = styled.div(({ theme: { colors } }) => ({
  position: "absolute",
  top: "-25px",
  left: "50%",
  transform: "translateX(-50%)",
  background: colors.white,
  padding: 8,
  borderRadius: 30,
}));

const SearchButton = styled.button(({ theme: { colors } }) => ({
  background: colors.main,
  borderRadius: 30,
  padding: 12,
  "& > img": {
    width: 20,
    height: 20,
  },
}));

const Drawer = styled(motion.div)(({ theme: { colors } }) => ({
  border: colors.border,
  position: "fixed",
  bottom: 0,
  left: 0,
  backgroundColor: colors.white,
  padding: 10,
  width: "100%",
  boxShadow: `0px -12px 40px rgba(0, 0, 0, 0.15)`,
}));

const Overlay = styled(motion.div)({
  position: "fixed",
  top: 0,
  left: 0,
  background: "rgba(0, 0, 0, 0.5)",
  width: "100%",
  height: "100vh",
});

export const MobileFilters = ({ createFilters, filters }: FiltersProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "initial";
    }
  }, [isDrawerOpen]);

  return (
    <FiltersContainer>
      <div>
        <Button variant="icon">
          <Icon icon="recipes" />
        </Button>
      </div>
      <div>
        <Button variant="icon">
          <Icon icon="calendar" />
        </Button>
      </div>
      <SearchButtonContainer>
        <SearchButton onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
          <Icon icon="search" />
        </SearchButton>
      </SearchButtonContainer>
      {isDrawerOpen && (
        <AnimatePresence>
          <Overlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsDrawerOpen(false)}
          />
          <Drawer
            initial={{ height: 0 }}
            animate={{ height: "50vh" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <FiltersBox createFilters={createFilters} {...filters} />
          </Drawer>
        </AnimatePresence>
      )}
    </FiltersContainer>
  );
};
