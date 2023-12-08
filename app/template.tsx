"use client"

import { SnackbarProvider } from "notistack"
import { MuiAlertSnackbar } from "./components/MuiAlertSnackbar"

export default function RootTemplate({ children }: React.PropsWithChildren) {
  return (
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
      {children}
    </SnackbarProvider>
  )
}
