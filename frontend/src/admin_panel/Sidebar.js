import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { Button, Tab } from "@mui/material";
import { useLocation, useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
// import { useHistory } from "react-router";

const drawerWidth = 340;

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
    width: `calc(${theme.spacing(9)} + 1px)`,
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
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export const SideBar = ({ setIsLoggedIn, setAdmin }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [curTab, setcurTab] = useState(0);
  const navigate = useNavigate();
  // const location = useLocation();
  const location = useLocation();

  // const handleDrawerOpen = () => {
  //   setOpen(true);
  // };

  console.log(location);

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const logOutHandler = () => {
    setIsLoggedIn(localStorage.removeItem("user", 0));
    navigate("/", { return: true });
    // return;
    // window.location.reload();
  };

  const homeCompHandler = () => {
    return navigate("/", { return: true });
  };

  return (
    //comment -> remove the box if need
    <>
      {/* <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <div
            onClick={() => {
              setAdmin(false);
              navigate("/", { return: true });
            }}
          >
            <img
              src="../images/salon_logo.jpg"
              alt=""
              style={{ width: "15%", borderRadius: "50%", height: "30%" }}
            />
          </div>

          <Button
            color="secondary"
            variant="contained"
            // onClick={logOutHandler}
            onClick={() => {
              setAdmin(false);
              localStorage.removeItem("user");
              setIsLoggedIn(false);
              navigate("/login", { return: true });
            }}
            style={{
              position: "absolute",
              right: 10
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar> */}
      {/* <CssBaseline /> */}

      <div>
        {/* <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider /> */}
        <List>
          <ListItem button>
            <NavLink to="/admin" style={{ textDecoration: "none" }}>
              <ListItemIcon>
                <InboxIcon />
                <ListItemText primary={"Dashboard"} />
              </ListItemIcon>
            </NavLink>
          </ListItem>
          <ListItem button>
            <NavLink to="admin/managemenu" style={{ textDecoration: "none" }}>
              <ListItemIcon>
                <InboxIcon />
                <ListItemText primary={"Manage Menu"} />
              </ListItemIcon>
            </NavLink>
          </ListItem>
          <ListItem button>
            <NavLink to="admin/managepage" style={{ textDecoration: "none" }}>
              <ListItemIcon>
                <InboxIcon />
                <ListItemText primary={"Manage Page"} />
              </ListItemIcon>
            </NavLink>
          </ListItem>
          <ListItem button>
            <NavLink to="admin/allservice" style={{ textDecoration: "none" }}>
              <ListItemIcon>
                <InboxIcon />
                <ListItemText primary={"Manage Service"} />
              </ListItemIcon>
            </NavLink>
          </ListItem>
          <ListItem button>
            <NavLink to="admin/appontment" style={{ textDecoration: "none" }}>
              <ListItemIcon>
                <InboxIcon />
                <ListItemText primary={"Manage Appointment"} />
              </ListItemIcon>
            </NavLink>
          </ListItem>
        </List>
      </div>
    </>
  );
};
