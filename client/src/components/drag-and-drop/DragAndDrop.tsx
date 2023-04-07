import { useCallback, useState, useRef } from "react";
import styled from "styled-components";
import useWindowDimensions from "hooks/useWindowDimensions";
import { Label, InputLabel } from "components/UI/Texts";

interface DragAndDropProps {
  label?: string;
  onUpload: (e: any) => void;
}

const Container = styled.div<{ active: boolean }>(
  ({ active, theme: { colors } }) => ({
    border: colors.dashedBorder,
    borderColor: active ? colors.main : colors.dashedBorderColor,
    borderRadius: 12,
    cursor: "pointer",
    height: 96,
    marginTop: 6,
  })
);

const UploadInput = styled.input({ cursor: "pointer", visibility: "hidden" });

export const DragAndDrop = ({
  label,
  onUpload,
  ...props
}: DragAndDropProps) => {
  const inputRef = useRef(null);
  const [isMobileView] = useWindowDimensions();
  const [isDropzoneActive, setIsDropzoneActive] = useState(false);
  const [file, setFile] = useState<{ name: string }>({ name: "" });

  const onDrag = useCallback(
    (e, active) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDropzoneActive(active);
    },
    [setIsDropzoneActive]
  );

  const onDrop = useCallback(
    (e) => {
      const file = e.dataTranfer.files[0];
      e.preventDefault();
      e.stopPropagation();
      setFile(file);
      onUpload(file);
    },
    [setFile, onUpload]
  );

  const onClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const onChange = useCallback(
    (e) => {
      e.preventDefault();
      if (e.target.files) {
        setFile(e.target.files[0]);
      }
    },
    [setFile]
  );

  return (
    <div style={{ marginTop: 20 }} {...props}>
      {!!label && <InputLabel>{label}</InputLabel>}
      <Container
        active={isDropzoneActive}
        draggable="true"
        onClick={onClick}
        onDragOver={(e) => onDrag(e, true)}
        onDrop={onDrop}
        onDragLeave={(e) => onDrag(e, false)}
        onDragEnd={(e) => onDrag(e, false)}
      >
        <UploadInput
          onChange={onChange}
          ref={inputRef}
          multiple={false}
          type="file"
        />
        <Label
          textAlign="center"
          opacity={!!file?.name ? "1" : "0.5"}
          padding="5px 0px"
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
