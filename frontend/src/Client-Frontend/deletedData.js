
{/* <>
  {menuData.filter((curSubMenu) => (
    <>
      <Menu {...bindMenu(popupState)}>
        <MenuItem onClick={popupState.close}>
          {curParMenu.id === curSubMenu.parent_Menu ? (
            <Button> {console.log(curSubMenu.title)}</Button>
          ) : (
            ""
          )}
        </MenuItem>
      </Menu>
    </>
  ))}
</>; */}



// -------------------------------



import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";
import { useNavigate } from "react-router";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";


export const NavBar_Frontend = ({ setIsLoggedIn, isLoggedIn }) => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [menuData, setmenuData] = useState([]);
  const navigate = useNavigate();

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  useEffect(async () => {
    let allMenu = await axios.get("http://localhost:5000/admin/allmenu");
    setmenuData(allMenu.data.data);
    return allMenu;
    // .then((result) => setdata(result.data.allData))
    // .catch((errror) => console.log(errror));
  }, []);

  const subMenuHanlder = (menu) => {
    console.log(menu);
    // menu.filter((subMenuData) => (
    //     console.log(subMenuData)
    // ))
  }
  


  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            LOGO
          </Typography>
          <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
              <>
                {menuData.map((curParMenu) => (
                  <>
                    {/* {console.log(curParMenu)} */}
                    <Button
                      variant="contained"
                      {...bindTrigger(popupState)}
                      key={curParMenu.id}
                      onClick={() =>  subMenuHanlder(menuData)}
                    >
                      {curParMenu.title}
                    </Button>
                    <>
                      {/* {menuData.find((curSubMenu) => console.log(curParMenu.id  === curSubMenu.menu) ? <Button> {curSubMenu.title }</Button>  : ""  )} */}
                    </>
                    {/* <>
                      {menuData.filter((curSubMenu) => (
                        <>
                          <Menu {...bindMenu(popupState)}>
                            <MenuItem onClick={popupState.close}>
                              {curParMenu.id === curSubMenu.parent_Menu ? (
                                <Button> {console.log(curSubMenu.title)}</Button>
                              ) : (
                                ""
                              )}
                            </MenuItem>
                          </Menu>
                        </>
                      ))}
                    </> */}

                    
                  </>
                ))}
              </>
            )}
          </PopupState>

          <Button
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex", color: "white" },
              // onClick={navigate}
            }}
            onClick={() => navigate("/login", { return: false })}
          >
            Login
          </Button>
          {/* </Box>  */}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

