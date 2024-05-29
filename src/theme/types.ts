type ContainerMaxWidths = {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
};

export type ThemeVariables = {
  // is this for colors only? seems t.white and t.black are only used as properties and other as ['string']
  white: string;
  black: string;
  containerMaxWidths: ContainerMaxWidths;
  [key: string]: string | ContainerMaxWidths;
};