export type Theme = {
  colorScheme: 'light' | 'dark';
  colors: {
    bgBase: string;
    fillPrimary: string;
    grey600: string;
    grey500: string;
    grey400: string;
    grey300: string;
    grey200: string;
    grey100: string;
  }
};

export const lightTheme = {
  colorScheme: 'light',
  colors: {
    bgBase: '#ffffff',
    fillPrimary: '#141414',

    grey600: '#141414',
    grey550: '#555555',
    grey500: '#a5a5a5',
    grey400: '#cccccc',
    grey300: '#e6e6e6',
    grey200: '#f0f0f0',
    grey100: '#f5f5f5',
  }
};
