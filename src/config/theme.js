import { createTheme } from "@mui/material/styles";
import { zhCN } from "@mui/material/locale";

export default createTheme({
  palette: {
    common: { black: "#000", white: "#fff" },
    background: { paper: "#fff", default: "#fafafa" },
    primary: {
      light: "rgba(69, 179, 157, 1)",
      main: "rgba(22, 160, 133, 1)",
      dark: "rgba(17, 122, 101, 1)",
      contrastText: "#fff",
    },
    secondary: {
      light: "rgba(153, 163, 164, 1)",
      main: "rgba(127, 140, 141, 1)",
      dark: "rgba(97, 106, 107, 1)",
      contrastText: "#fff",
    },
    error: {
      light: "rgba(236, 112, 99, 1)",
      main: "rgba(231, 76, 60, 1)",
      dark: "rgba(203, 67, 53, 1)",
      contrastText: "#fff",
    },
    text: {
      primary: "rgba(39, 55, 70, 1)",
      secondary: "rgba(171, 178, 185, 1)",
      disabled: "rgba(213, 216, 220, 1)",
      hint: "rgba(128, 139, 150, 1)",
    },
  },
  zhCN,
});
