import { useCallback, useState } from "react";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";
import useWindowDimensions from "hooks/useWindowDimensions";
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

export const DragAndDrop = ({
  label,
  onUpload,
  ...props
}: DragAndDropProps) => {
  const [isMobileView] = useWindowDimensions();
  const [file, setFile] = useState();

  const onDrop = useCallback((acceptedFiles: any) => {
    setFile(acceptedFiles[0]);
    onUpload(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...props}>
      <Header>
        <InputLabel>{label}</InputLabel>
        {file && <InputLabel color="main">Remove image</InputLabel>}
      </Header>
      <Container draggable="true" {...getRootProps()} isActive={file}>
        <UploadInput multiple={false} type="file" {...getInputProps()} />
        {file ? (
          <Img image={URL.createObjectURL(file)} />
        ) : (
          <Label textAlign="center" opacity={0.5} padding="70px 0px">
            {isMobileView ? "Click here to add image" : "Drop image here"}
          </Label>
        )}
      </Container>
    </div>
  );
};
