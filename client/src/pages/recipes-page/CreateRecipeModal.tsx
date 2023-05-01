import { useCallback, useState } from "react";
import styled from "styled-components";
import { useCreateRecipe } from "queries/useCreateRecipe";
import { Modal } from "components/modal/Modal";
import { TextInput } from "components/text-input/TextInput";
import { Button } from "components/button/Button";
import { useToast } from "hooks/useToast";
import { DragAndDrop } from "components/drag-and-drop/DragAndDrop";
import { Dropdown } from "components/dropdown/Dropdown";

const options = [
  { id: "side_dish", name: "Side Dish" },
  { id: "dessert", name: "Dessert" },
  { id: "main_dish", name: "Main Dish" },
  { id: "drinks", name: "Drinks" },
];

type CreateRecipeModalProps = {
  closeModal: () => void;
  visible: boolean;
};

const Body = styled.div({
  padding: 14,
});

const InputGroup = styled.div({
  display: "flex",
  justifyContent: "space-between",
  margin: "20px 0px",
});

const Footer = styled.div(({ theme: { colors } }) => ({
  background: colors.white,
  bottom: 0,
  padding: "12px 0px",
  position: "sticky",
  width: "100%",
}));

export const CreateRecipeModal = ({
  closeModal,
  visible,
}: CreateRecipeModalProps) => {
  const [recipe, setRecipe] = useState({});
  const [upload, setUpload] = useState("");
  const createRecipe = useCreateRecipe();
  const toast = useToast();

  const addValue = useCallback(
    (e: any) => {
      const { id, value } = e.target;
      setRecipe({ ...recipe, [id]: value });
    },
    [setRecipe, recipe]
  );

  const addType = useCallback(
    (value) => {
      const { id } = value;
      setRecipe({ ...recipe, tag: id });
    },
    [setRecipe, recipe]
  );

  const onUpload = useCallback(
    (image) => {
      setUpload(image);
    },
    [setRecipe, recipe]
  );

  const newRecipe = useCallback(async () => {
    try {
      const formData = new FormData();
      for (const key in recipe) {
        if (recipe.hasOwnProperty(key)) {
          const value = recipe[key];
          formData.append(key, value);
        }
      }
      formData.append("thumbnail", upload);
      await createRecipe.mutateAsync(formData);
      toast.open("New recipe was created.");
      closeModal();
    } catch (error) {
      toast.open("An error has ocurred.");
    }
  }, [closeModal, recipe, createRecipe, toast, upload]);

  return (
    <Modal
      closeModal={closeModal}
      title="New recipe"
      visible={visible}
      styles={{ maxHeight: "90vh" }}
    >
      <Body>
        <DragAndDrop
          label="Image"
          onUpload={onUpload}
          style={{ marginBottom: 20 }}
        />
        <TextInput
          id="name"
          label="Name"
          onChange={addValue}
          placeholder="Eg. “Spicy Chicken Pasta”"
        />
        <InputGroup>
          <TextInput
            id="calories_count"
            label="Kcal per serving"
            onChange={addValue}
            placeholder="Eg. “524”"
          />
          <TextInput
            id="cooking_time"
            label="Time to prepare"
            onChange={addValue}
            placeholder="Eg. “32”"
          />
        </InputGroup>
        <TextInput
          id="url"
          label="Recipe URL"
          onChange={addValue}
          placeholder="https://instagram.com/url"
          style={{ marginBottom: 20 }}
        />
        <Dropdown label="Type" onSelect={addType} options={options} />
        <Footer>
          <Button
            onClick={newRecipe}
            styles={{ marginTop: 20, height: 56, width: "100%" }}
            variant="contained"
          >
            Create
          </Button>
        </Footer>
      </Body>
    </Modal>
  );
};
