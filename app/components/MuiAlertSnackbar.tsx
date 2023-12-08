"use client"

import { forwardRef } from "react"
import { CustomContentProps, SnackbarContent, closeSnackbar } from "notistack"
import MuiAlert, { AlertColor } from "@mui/material/Alert"

export const MuiAlertSnackbar = forwardRef<HTMLDivElement, CustomContentProps>(
  (props, forwardedRef) => {
    const { id, variant, message } = props
    return (
      <SnackbarContent ref={forwardedRef}>
        <MuiAlert
          severity={variant as AlertColor}
          sx={{ width: "100%" }}
          onClose={() => closeSnackbar(id)}
        >
          {message}
        </MuiAlert>
      </SnackbarContent>
    )
  }
)
