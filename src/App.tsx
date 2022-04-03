import "./App.css";
import Workspace from "./components/Workspace";
import ThemeProvider from "./context/ThemeContext";

const App = () => {
  return (
    <ThemeProvider>
      <Workspace />
    </ThemeProvider>
  );
};

export default App;
