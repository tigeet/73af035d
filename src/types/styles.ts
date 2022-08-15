interface SCTheme {
  colorBackground: string;
  colorPrimary: string;
  colorText: {
    main: string;
    light: string;
    alternative: string;
  };

  colorShadow: string;
}

export type { SCTheme };
