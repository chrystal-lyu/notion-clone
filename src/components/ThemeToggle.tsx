import { ChangeEvent, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Theme } from "../types/theme";

const ThemeToggle = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value as Theme);
  };
  return (
    <select value={theme} onChange={handleChange}>
      <option value="light">Light</option>
      <option value="dark">dark</option>
    </select>
  );
};

export default ThemeToggle;
