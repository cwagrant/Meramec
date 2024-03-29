import * as React from "react";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Outlet, useNavigate } from "react-router-dom";
import {
  createTheme,
  styled,
  ThemeProvider,
  useTheme,
} from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PeopleIcon from "@mui/icons-material/People";
import FolderIcon from "@mui/icons-material/Folder";
import PaidIcon from "@mui/icons-material/Paid";
import ReceiptIcon from "@mui/icons-material/Receipt";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import { SnackbarProvider } from "notistack";

import useAxios from "./useAxios";
import * as paths from "./PathHelper";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  [theme.breakpoints.down("sm")]: {
    width: `0px`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
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
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  }),
);

const ListLink = ({ open, to, name, icon }) => {
  return (
    <ListItem
      key={name}
      component={Link}
      to={to}
      disablePadding
      sx={{ display: "block" }}
    >
      <ListItemButton
        sx={{
          minHeight: 48,
          justifyContent: open ? "initial" : "center",
          px: 2.5,
        }}
      >
        <ListItemIcon
          sx={{ minWidth: 0, mr: open ? 3 : "auto", justifyContent: "center" }}
        >
          {icon}
        </ListItemIcon>
        <ListItemText
          primary={name}
          sx={{ color: "#fff", opacity: open ? 1 : 0 }}
        />
      </ListItemButton>
    </ListItem>
  );
};

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#d6deeb",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#011627",
      paper: "#011627",
    },
  },
});

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const axios = useAxios();
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    let urlParams = new URLSearchParams(window.location.search);
    let redirect_to = urlParams.get("redirect_to");

    axios
      .get(paths.API.USER.CHECKIN())
      .then((res) => {
        // all signed in
      })
      .catch((error) => {
        // ideally we send state information to login to let us have a redirect
        navigate("/login");
      });
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <SnackbarProvider>
          <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  sx={{
                    marginRight: 5,
                    ...(open && { display: "none" }),
                  }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                  Meramec
                </Typography>
              </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
              <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === "rtl"
                    ? <ChevronRightIcon />
                    : <ChevronLeftIcon />}
                </IconButton>
              </DrawerHeader>
              <Divider />
              <List>
                <ListLink
                  open={open}
                  to="/properties"
                  name="Properties"
                  icon={<ApartmentIcon />}
                />
                <ListLink
                  open={open}
                  to="/customers"
                  name="Customers"
                  icon={<PeopleIcon />}
                />
                <ListLink
                  open={open}
                  to="/agreements"
                  name="Rental Agreements"
                  icon={<FolderIcon />}
                />
                <ListLink
                  open={open}
                  to="/invoices"
                  name="Invoices"
                  icon={<ReceiptIcon />}
                />
                <ListLink
                  open={open}
                  to="/payments"
                  name="Payments"
                  icon={<PaidIcon />}
                />
              </List>
              <Divider />
              <List>
                <ListLink
                  open={open}
                  to="/users"
                  name="Users"
                  icon={<PeopleIcon />}
                />
                <ListLink
                  open={open}
                  to="/logout"
                  name="Logout"
                  icon={<LogoutIcon />}
                />
              </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: { xs: 1, sm: 3 } }}>
              <DrawerHeader />
              <Outlet />
            </Box>
          </Box>
        </SnackbarProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
