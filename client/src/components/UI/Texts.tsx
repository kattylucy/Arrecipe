import styled from "@emotion/styled";

const sizes = {
  extraSmall: '0.8rem',
  small: '0.9rem',
  normal: '1rem',
  large: '1.2rem',
}

interface TextTypes extends React.CSSProperties {
  color?: string,
  theme?: any;
  size?: string,
};

export const Label = styled.p(
  ({ color = 'black', theme: { colors, fonts }, size = 'normal', ...props }: TextTypes) => ({
    fontSize: sizes[size],
    fontFamily: fonts.main,
    margin: 0,
    color: colors[color],
    ...props
  })
);

export const H3 = styled.h3(
  ({ color = 'black', theme: { colors, fonts }, ...props }: TextTypes) => ({
    fontFamily: fonts.main,
    margin: 0,
    color: colors[color],
    fontSize: '1.125rem',
    ...props
  })
);

export const InputLabel = styled.label(
  ({ theme: { colors, fonts }, ...props }: TextTypes) => ({
    color: colors.gray,
    fontSize: ".85rem",
    fontFamily: fonts.main,
    fontWeight: 500,
    margin: 0,
    ...props,
  })
);
