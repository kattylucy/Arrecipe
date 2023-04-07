import { DefaultTheme } from "styled-components";
import { device } from "utilities/mediaQueries";

const theme: DefaultTheme = {
  colors: {
    black: "#000000",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.025), 0px 12px 40px rgba(0, 0, 0, 0.075)",
    dashedBorder: "1px dashed rgba(0, 0, 0, 0.2)",
    dashedBorderColor: "rgba(0, 0, 0, 0.2)",
    gray: "#878787",
    hoveredBg: " rgba(0, 0, 0, 0.05)",
    main: "#FF9254",
    warning: "#D0342C",
    white: "#FFFFFF",
  },
  fonts: {
    main: "Inter",
    secondary: "Gloria Hallelujah",
  },
  media: {
    ...device,
  },
};

export default theme;
