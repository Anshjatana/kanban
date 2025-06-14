import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      bg: {
        primary: string;
        secondary: string;
        tertiary: string;
        elevated: string;
      };
      surface: {
        primary: string;
        secondary: string;
        hover: string;
        border: string;
      };
      text: {
        primary: string;
        secondary: string;
        tertiary: string;
        inverse: string;
      };
      status: {
        todo: string;
        inProgress: string;
        done: string;
      };
      interactive: {
        primary: string;
        primaryHover: string;
        danger: string;
        dangerHover: string;
      };
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
    borderRadius: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    shadows: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
  }
}
