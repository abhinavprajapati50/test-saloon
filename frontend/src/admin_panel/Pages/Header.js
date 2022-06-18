import React from 'react';
import Toolbar from "@mui/material/Toolbar";
import { Button, Tab } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MuiAppBar from "@mui/material/AppBar";
import { useLocation, useNavigate } from "react-router";

const Header = ({ setIsLoggedIn, setAdmin }) => {

    const navigate = useNavigate();

  return (
    <div>
      <MuiAppBar position="static">
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
              right: 10,
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </MuiAppBar>
    </div>
  );
};

export default Header
