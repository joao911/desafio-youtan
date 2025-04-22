import { useTheme } from "@/hooks/useTheme";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export function DarkMode() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 text-gray-800 transition-all duration-300 bg-gray-200 rounded-lg dark:bg-gray-800 dark:text-gray-200"
    >
      {theme === "dark" ? <DarkModeIcon /> : <Brightness4Icon />}
    </button>
  );
}
