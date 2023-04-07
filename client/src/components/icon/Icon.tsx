import styled from "styled-components";
import { Icons } from "./Icons.js";

interface IconProps {
  icon: string;
  styles?: React.CSSProperties;
}

const StyledIcon = styled.img<{ styles: any }>(({ styles }) => ({
  width: 32,
  height: 32,
  ...styles,
}));

export const Icon = ({ icon, styles, ...props }: IconProps) => (
  <StyledIcon src={Icons[icon]} styles={styles} {...props} />
);
