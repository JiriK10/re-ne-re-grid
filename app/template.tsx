"use client"

import { createTheme, ThemeProvider } from "@mui/material/styles"
import { SnackbarProvider } from "notistack"
import { MuiAlertSnackbar } from "./components/MuiAlertSnackbar"

import Nav from "./components/Nav/Nav"

import resolveConfig from "tailwindcss/resolveConfig"
import tailwindConfigRaw from "../tailwind.config.ts"

const tailwindConfig = resolveConfig(tailwindConfigRaw)
const theme = createTheme({
  palette: {
    primary: { main: (tailwindConfig.theme.colors as any).primary },
  },
})

export default function RootTemplate({ children }: React.PropsWithChildren) {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        Components={{
          info: MuiAlertSnackbar,
          warning: MuiAlertSnackbar,
          success: MuiAlertSnackbar,
          error: MuiAlertSnackbar,
        }}
        maxSnack={3}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Nav>{children}</Nav>
      </SnackbarProvider>
    </ThemeProvider>
  )
}
