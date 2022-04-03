export enum Theme {
  Dark = "dark",
  Light = "light",
}

export type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};
