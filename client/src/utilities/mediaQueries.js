export const size = {
  mobileS: 320,
  mobileM: 375,
  mobileL: 425,
  tablet: 768,
  laptop: 1024,
  laptopL: 1440,
  desktop: 2560,
};

export const device = {
  mobileS: `@media (max-width: ${size.mobileS}px)`,
  mobileM: `@media (max-width: ${size.mobileM}px)`,
  mobileL: `@media (max-width: ${size.mobileL}px)`,
  tablet: `@media (max-width: ${size.tablet}px)`,
  laptop: `@media (max-width: ${size.laptop}px)`,
  laptopL: `@media (max-width: ${size.laptopL}px)`,
  desktop: `@media (max-width: ${size.desktop}px)`,
  desktopL: `@media (max-width: ${size.desktop}px)`,
};
