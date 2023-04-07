import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import styled from "styled-components";
import { Icon } from "components/icon/Icon";
import { Label } from "components/UI/Texts";

type LabelsObj = {
  [key: string]: string;
};

interface SliderProps {
  countingRange: number;
  labels: LabelsObj;
  maxValue: number;
  minValue: number;
  setSliderValue: (value: number) => void;
  style?: any;
}

const SliderHeader = styled.div({
  alignItems: "center",
  display: "flex",
  justifyContent: "space-between",
  marginBottom: 12,
});

const Sublabel = styled.div({
  display: "flex",
});

export const SliderFilter = ({
  countingRange,
  labels,
  maxValue,
  minValue,
  setSliderValue,
  style,
  ...props
}: SliderProps) => {
  return (
    <div style={{ ...style }} {...props}>
      <SliderHeader>
        <Label size="small" fontWeight="600">
          {labels.label}
        </Label>
        <Sublabel>
          <Label size="extraSmall" opacity="0.7">
            Less than
          </Label>
          <Label size="extraSmall" fontWeight="600" marginLeft="4px">
            {labels.sublabel}
          </Label>
        </Sublabel>
      </SliderHeader>
      <Slider
        defaultValue={0}
        focusThumbOnChange={false}
        onChange={(val) => setSliderValue(val)}
        min={minValue}
        max={maxValue}
        step={countingRange}
      >
        <SliderTrack h="2px" bg="rgba(0, 0, 0, 0.1)">
          <SliderFilledTrack bg="#151515" />
        </SliderTrack>
        <SliderThumb border="none" bg="transparent" boxSize={5}>
          <Icon icon="slider" />
        </SliderThumb>
      </Slider>
    </div>
  );
};
