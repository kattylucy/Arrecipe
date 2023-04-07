import { useCallback, useState } from "react";
import styled from "styled-components";
import { useCreateRecipe } from "queries/useCreateRecipe";
import { Modal } from "components/modal/Modal";
import { TextInput } from "components/text-input/TextInput";
import { Button } from "components/button/Button";
import { useToast } from "hooks/useToast";
import { DragAndDrop } from "components/drag-and-drop/DragAndDrop";

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
  const createRecipe = useCreateRecipe();
  const toast = useToast();

  const addValue = useCallback(
    (e: any) => {
      const { id, value } = e.target;
      setRecipe({ ...recipe, [id]: value });
    },
    [setRecipe, recipe]
  );

  const onUpload = useCallback(
    (image) => {
      setRecipe({ ...recipe, image });
    },
    [setRecipe, recipe]
  );

  const newRecipe = useCallback(async () => {
    try {
      await createRecipe.mutateAsync(recipe);
      toast.open("New recipe was created.");
      closeModal();
    } catch (error) {
      toast.open("An error has ocurred.");
    }
  }, [closeModal, recipe, createRecipe, toast]);

  return (
    <Modal
      closeModal={closeModal}
      title="New recipe"
      visible={visible}
      styles={{ maxHeight: 500 }}
    >
      <Body>
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
        />
        {/* need to add handle for edit */}
        <DragAndDrop label="Image" onUpload={onUpload} />
        <Footer>
          <Button
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
