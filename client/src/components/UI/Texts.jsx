import styled from "styled-components";

const sizes = {
  extraSmall: "0.8rem",
  small: "0.9rem",
  normal: "1rem",
  large: "1.2rem",
};

export const Label = styled.p(
  ({ size, color, theme: { colors, fonts }, ...props }) => ({
    fontSize: sizes[size],
    fontFamily: fonts.main,
    margin: 0,
    color: colors[color],
    ...props,
  })
);

export const H3 = styled.h3(
  ({ color = "black", theme: { colors, fonts }, ...props }) => ({
    fontFamily: fonts.main,
    margin: 0,
    color: colors[color],
    fontSize: "1.125rem",
    ...props,
  })
);

export const InputLabel = styled.label(
  ({ color = "black", theme: { colors, fonts }, ...props }) => ({
    color: colors[color],
    fontSize: ".85rem",
    fontFamily: fonts.main,
    fontWeight: 600,
    margin: 0,
    ...props,
  })
);
