"use client"

import Link from "next/link"
import { styled, Theme, CSSObject } from "@mui/material/styles"
import Divider from "@mui/material/Divider"
import MuiDrawer, { DrawerProps as MuiDrawerProps } from "@mui/material/Drawer"
import IconButton from "@mui/material/IconButton"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import CottageIcon from "@mui/icons-material/Cottage"
import BrowserNotSupportedIcon from "@mui/icons-material/BrowserNotSupported"
import QuestionMarkIcon from "@mui/icons-material/QuestionMark"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"

interface AppDrawerProps extends MuiDrawerProps {
  drawerWidth: number
  open?: boolean
  onDrawerClose?: React.MouseEventHandler
}

interface AppDrawerListItemProps extends React.PropsWithChildren {
  open?: boolean
  text: string
}

interface AppDrawerListLinkProps extends AppDrawerListItemProps {
  href: string
}

export const AppDrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

function AppDrawerListItem({ children, open, text }: AppDrawerListItemProps) {
  const itemSx = { display: "block" }
  const itemBtnSx = {
    minHeight: 48,
    justifyContent: open ? "initial" : "center",
    px: 2.5,
  }
  const itemTextSx = { opacity: open ? 1 : 0 }
  const itemIconSx = {
    minWidth: 0,
    mr: open ? 3 : "auto",
    justifyContent: "center",
  }
  return (
    <ListItem disablePadding sx={itemSx}>
      <ListItemButton sx={itemBtnSx}>
        <ListItemIcon sx={itemIconSx}>{children}</ListItemIcon>
        <ListItemText primary={text} sx={itemTextSx} />
      </ListItemButton>
    </ListItem>
  )
}

function AppDrawerListLink(props: AppDrawerListLinkProps) {
  const { href } = props
  return (
    <Link href={href}>
      <AppDrawerListItem {...props} />
    </Link>
  )
}

const openedMixin = (theme: Theme, drawerWidth: number): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)})`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)})`,
  },
})

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) =>
    !["drawerWidth", "open", "onDrawerClose"].includes(prop as string),
})<AppDrawerProps>(({ theme, drawerWidth, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme, drawerWidth),
    "& .MuiDrawer-paper": openedMixin(theme, drawerWidth),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}))

export default function AppDrawer(props: AppDrawerProps) {
  const { open, onDrawerClose } = props
  return (
    <Drawer variant="permanent" {...props}>
      <AppDrawerHeader>
        <IconButton onClick={onDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </AppDrawerHeader>
      <Divider />
      <List>
        <AppDrawerListLink open={open} href="/" text="Home">
          <CottageIcon />
        </AppDrawerListLink>
        <AppDrawerListLink open={open} href="/not-there" text="Not there">
          <BrowserNotSupportedIcon />
        </AppDrawerListLink>
      </List>
      <Divider />
      <List>
        {["All objects", "Recent", "Trash"].map((text) => (
          <AppDrawerListItem key={text} open={open} text={text}>
            <QuestionMarkIcon />
          </AppDrawerListItem>
        ))}
      </List>
    </Drawer>
  )
}
