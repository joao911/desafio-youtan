import { useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";

import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  IconButton,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export function DarkMode() {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  function toggleColorMode() {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  }

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
        },
      }),
    [mode]
  );

  useEffect(() => {
    if (prefersDarkMode) {
      setMode("light");
    }
  }, [prefersDarkMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box>
        <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
          {mode === "dark" ? <DarkModeIcon /> : <Brightness4Icon />}
        </IconButton>
      </Box>
    </ThemeProvider>
  );
}
