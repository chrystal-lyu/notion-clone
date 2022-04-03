import { createContext, FC, ReactNode, useState } from "react";
import { Theme } from "../types/theme";
import type { ThemeContextType } from "../types/theme";

export const ThemeContext = createContext<ThemeContextType>({
  theme: Theme.Dark,
  setTheme: () => console.warn("no theme provider"),
});

const ThemeProvider: FC<ReactNode> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(Theme.Dark);
  return (
    <ThemeContext.Provider value={{ theme: theme, setTheme: setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
