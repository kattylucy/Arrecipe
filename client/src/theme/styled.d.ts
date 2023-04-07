import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      black: string;
      border: string;
      boxShadow: string;
      dashedBorder: string;
      dashedBorderColor: string;
      gray: string;
      hoveredBg: string;
      main: string;
      warning: string;
      white: string;
    };
    fonts: {
      main: string;
      secondary: string;
    };
    media: {
      mobileS: string;
      mobileM: string;
      mobileL: string;
      tablet: string;
      laptop: string;
      laptopL: string;
      desktop: string;
      desktopL: string;
    };
  }
}
