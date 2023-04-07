type variantStringType = "text" | "solid";
type colorStringType = "primary";

export type ButtonProps = {
  color?: colorStringType;
  label: string;
  styles?: object;
  onClick: () => void;
  variant?: variantStringType;
};

export type ButtonPropsStyle = {
  color?: colorStringType;
  styles?: object;
  variant?: variantStringType;
};
