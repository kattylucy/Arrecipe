import { useCallback, useState } from "react";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";
import useWindowDimensions from "hooks/useWindowDimensions";
import { Label } from "components/UI/Texts";

interface DragAndDropProps {
  label?: string;
  onUpload: (e: any) => void;
}

const Container = styled.div<{ active?: boolean }>(
  ({ active, theme: { colors } }) => ({
    alignItems: "center",
    border: colors.dashedBorder,
    borderColor: active ? colors.main : colors.dashedBorderColor,
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

export const DragAndDrop = ({
  label,
  onUpload,
  ...props
}: DragAndDropProps) => {
  const [isMobileView] = useWindowDimensions();
  const [file, setFile] = useState<{ name: string }>({ name: "" });

  const onDrop = useCallback((acceptedFiles: any) => {
    setFile(acceptedFiles[0]);
    onUpload(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div style={{ marginTop: 20 }} {...props}>
      <Container
        active={isDragActive || file?.name}
        draggable="true"
        {...getRootProps()}
      >
        <UploadInput multiple={false} type="file" {...getInputProps()} />
        <Label
          textAlign="center"
          opacity={!!file?.name ? "1" : "0.5"}
          padding="70px 0px"
        >
          {isMobileView
            ? "Click here to add image"
            : !!file?.name
            ? file?.name
            : "Drop image here"}
        </Label>
      </Container>
    </div>
  );
};
