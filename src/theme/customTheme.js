// src/theme/customTheme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: `'Poppins', sans-serif`,
  },
  palette: {
    primary: {
      main: "#7B5FFF", // Left end of gradient
      dark: "#6A4DFF",
    },
    secondary: {
      main: "#D88EFF", // Right end of gradient
    },
    grey: {
      100: "#FAFAFA",
      200: "#E0E0E0",
      300: "#999999",
    },
    background: {
      default: "#F5F5F5",
      paper: "#FFFFFF",
    },
  },
  shadows: [
    "none",
    "0px 2px 8px rgba(0, 0, 0, 0.05)", // used for card shadow
    ...Array(23).fill("none"),
  ],
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          textTransform: "none",
          borderRadius: 20,
        },
      },
    },
  },
});

export default theme;
