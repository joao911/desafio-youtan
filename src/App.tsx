import { BrowserRouter } from "react-router-dom";
import { Router } from "./Routes";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api/react-query";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

export function App() {
  const theme = createTheme({
    palette: {
      mode: "light", // Modo claro
      primary: {
        main: "#1976d2", // Azul primário
        light: "#63a4ff", // Azul claro
        dark: "#115293", // Azul escuro
      },
      secondary: {
        main: "#f50057", // Rosa secundário
        light: "#ff4081", // Rosa claro
        dark: "#ab003c", // Rosa escuro
      },
      background: {
        default: "#ffffff", // Cor de fundo principal
        paper: "#f5f5f5", // Cor de fundo dos papéis (como Card)
      },
      text: {
        primary: "#000000", // Cor do texto principal
        secondary: "#555555", // Cor do texto secundário
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
