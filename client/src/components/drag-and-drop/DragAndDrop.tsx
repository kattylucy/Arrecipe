import { useCallback, useState } from "react";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";
import { Label, InputLabel } from "components/UI/Texts";

interface DragAndDropProps {
  label?: string;
  onUpload: (e: any) => void;
  style?: any;
}

const Container = styled.div<{ isActive: boolean }>(
  ({ isActive, theme: { colors } }) => ({
    alignItems: "center",
    border: colors.dashedBorder,
    borderColor: isActive ? "transparent" : colors.dashedBorderColor,
    borderRadius: 12,
    cursor: "pointer",
    display: "flex",
    height: 96,
    justifyContent: "center",
    marginTop: 6,
  })
);

const UploadInput = styled.input({
  cursor: "pointer",
  visibility: "hidden",
});

const Img = styled.div<{ image: string }>(({ image }) => ({
  backgroundImage: `url(${image})`,
  backgroundSize: "cover",
  width: "100%",
  height: "100%",
  borderRadius: "inherit",
  backgroundPosition: "center",
}));

const Header = styled.div({
  display: "flex",
  justifyContent: "space-between",
});

export const DragAndDrop = ({ label, onUpload, style }: DragAndDropProps) => {
  const [image, setImage] = useState("");

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
        onUpload(file);
      };
      reader.readAsDataURL(file);
    },
    [onUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      {label && <InputLabel>{label}</InputLabel>}
      <Container {...getRootProps()} isActive={isDragActive} style={style}>
        <UploadInput {...getInputProps()} />
        {image ? (
          <Img image={image} />
        ) : (
          <Label opacity={0.5}>Add image here</Label>
        )}
      </Container>
    </>
  );
};
