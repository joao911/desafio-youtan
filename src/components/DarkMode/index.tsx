import { useTheme } from "@/hooks/useTheme";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { Tooltip } from "@mui/material";

export function DarkMode() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Tooltip title={theme === "dark" ? "Tema escuro" : "Tema claro"}>
      <button
        onClick={toggleTheme}
        className="p-2 text-gray-800 transition-all duration-300 bg-gray-200 rounded-lg dark:bg-gray-800 dark:text-gray-200"
      >
        {theme === "dark" ? <DarkModeIcon /> : <Brightness4Icon />}
      </button>
    </Tooltip>
  );
}
