"use client"

import { useState } from "react"
import { useTheme } from "@mui/material/styles"
import { Box } from "@mui/material"

import AppBar from "./AppBar"
import AppDrawer, { AppDrawerHeader } from "./AppDrawer"

const drawerWidth = 240

export default function Nav({ children }: React.PropsWithChildren) {
  const theme = useTheme()
  const [open, setOpen] = useState(false)

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        title="My React/Next/Redux playground"
        position="fixed"
        drawerWidth={drawerWidth}
        open={open}
        onDrawerOpen={() => setOpen(true)}
      />
      <AppDrawer
        drawerWidth={drawerWidth}
        open={open}
        onDrawerClose={() => setOpen(false)}
      />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <AppDrawerHeader />
        {children}
      </Box>
    </Box>
  )
}
