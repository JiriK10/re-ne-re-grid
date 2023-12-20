"use client"

import React, { useState } from "react"
import { styled } from "@mui/material/styles"
import useScrollTrigger from "@mui/material/useScrollTrigger"
import { Badge, Box, IconButton, Toolbar, Typography } from "@mui/material"
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar"
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material"

interface AppBarProps extends MuiAppBarProps {
  drawerWidth: number
  title: string
  open?: boolean
  onDrawerOpen?: React.MouseEventHandler
}

function OnScroll({ children }: React.PropsWithChildren) {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  })

  return React.cloneElement(children as React.ReactElement, {
    elevation: trigger ? 4 : 0,
  })
}

const StyledAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) =>
    !["drawerWidth", "open", "onDrawerOpen"].includes(prop as string),
})<AppBarProps>(({ theme, drawerWidth, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

export default function AppBar(props: AppBarProps) {
  const { title, open, onDrawerOpen } = props
  const [notifications, setNotifications] = useState(42)
  return (
    <OnScroll>
      <StyledAppBar position="fixed" {...props}>
        <Toolbar>
          <IconButton
            color="inherit"
            title="Open menu"
            aria-label="Open drawer"
            edge="start"
            sx={{
              ml: { xs: -1, sm: -1.5 },
              mr: 2,
              ...(open && { display: "none" }),
            }}
            onClick={onDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {title}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="Show fake new notifications"
              color="inherit"
              title="Fake notifications"
              onClick={() => setNotifications(notifications + 1)}
            >
              <Badge badgeContent={notifications} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </StyledAppBar>
    </OnScroll>
  )
}
