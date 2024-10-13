import { BrowserRouter } from "react-router-dom";
import { Router } from "./Routes";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api/react-query";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

export function App() {
  const theme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#1976d2",
        light: "#63a4ff",
        dark: "#115293",
      },
      secondary: {
        main: "#f50057",
        light: "#ff4081",
        dark: "#ab003c",
      },
      background: {
        default: "#ffffff",
        paper: "#f5f5f5",
      },
      text: {
        primary: "#000000",
        secondary: "#555555",
      },
    },
  });

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router />
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}
