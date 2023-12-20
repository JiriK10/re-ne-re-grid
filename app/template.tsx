"use client"

import { createTheme, ThemeProvider } from "@mui/material/styles"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment"
import { SnackbarProvider } from "notistack"

import Nav from "./components/Nav/Nav"
import { MuiAlertSnackbar } from "./components/MuiAlertSnackbar"

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
      <LocalizationProvider dateAdapter={AdapterMoment}>
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
      </LocalizationProvider>
    </ThemeProvider>
  )
}
