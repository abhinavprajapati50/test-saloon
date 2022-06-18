import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import Menu from "@mui/material/Menu";
import ReactHtmlParser from "html-react-parser";

import IconButton from "@mui/material/IconButton";

import { Route, Routes } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";


import axios from "axios";
import { useNavigate } from "react-router";
import { Home } from "./Home";
import { NavLink } from "react-router-dom";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

import Modal from "@mui/material/Modal";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import { Stack, TextField } from "@mui/material";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TimePicker from "@mui/lab/TimePicker";
import { Demo } from "./DEMO";

const MenuModelStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1050,
  height: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  overflowY: "auto",
  p: 1,
  boxShadow: 24,
};

{
  /* first_name, last_name, email,mobile, service_type(Static DD),
date, time, remark, status[requested, confirmed, rejected] */
}
export const NavBar = ({ setAdmin, setIsLoggedIn, isLoggedIn }) => {
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [email, setemail] = useState("");
  const [mobile, setmobile] = useState("");
  const [service_type, setservice_type] = useState("");
  const [date, setdate] = useState(new Date("2022-01-18T21:11:54"));
  const [time, settime] = useState(new Date("2022-01-18T21:11:54"));
  const [remark, setremark] = useState("");

  const [menuData, setmenuData] = useState([]);
  const [childMenu, setchildMenu] = useState([]);
  const [pages, setpages] = useState([]);
  const [chr_delete, setChr_delete] = useState(0)
  const [subMenu, setsubMenu] = useState(false);
  const [subPages, setsubPages] = useState([]);

  const [open, setOpen] = useState(false);
  const [appointmentData, setappointmentData] = useState([]);

  const navigate = useNavigate();

  const handleDate = (newValue) => {
    console.log(newValue.toLocaleString());
    setdate(newValue);
  };
  const handleTime = (newValue) => {
    settime(newValue);
  };

  const style = {
    marginBottom: "2rem",
  };

  /* first_name, last_name, email,mobile, service_type(Static DD),
date, time, remark, status[requested, confirmed, rejected] */

  const clearData = (data) => {
    setfirst_name("");
    setlast_name("");
    setemail("");
    setmobile("");
    setservice_type("");
    setdate("");
    settime("");
    setremark("");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    /* first_name, last_name, email,mobile, service_type(Static DD),
date, time, remark, status[requested, confirmed, rejected] */

    try {
      const result = await axios.post(
        "http://localhost:5000/admin/appontment",
        {
          first_name,
          last_name,
          email,
          mobile,
          service_type,
          date,
          time,
          remark,
          chr_delete
        }
      );
      setappointmentData(result.data);
      console.log(appointmentData);

      if (result.data.type === "conflict") {
        toast.warn(result.data.message);
        return;
      }
      if (result.data.type === "error") {
        console.log("THE EROR MESSAGE");
        toast.error(result.data.message);
        return;
      }

      if (result.data.type === "success") {
        toast.success(result.data.message);
        setOpen(false);
        clearData();
        return result.data;
      }

      console.log("========result --", result);

      // apiFunc();
      // handleClose();
      // openUpdateModalHandler()
    } catch (error) {
      toast.error(error.response.data.message);
      return console.log("error: " + error);
    }
  };

  // appointmentData.type === "conflict" &&  toast.warn(appointmentData.message)

  // console.log(appointmentData);

  // const routesNav = (menuData) => {
  //   console.log(`-----------THEMENU DATA ${menuData.page_slug}`);
  //   <Routes>
  //     <Route
  //       path={`/${menuData.page_slug}`}
  //       element={<Demo menuData={menuData.description}  />}
  //     />

  //     {/* <Route path="*" element={<Navigate replace to="/" />} /> */}
  //   </Routes>;
  // };

  const handleChooseSubMenu = (menuDataa) => {
    // console.log(id);

    console.log(menuDataa);
    // routesNav(menuDataa);
    setsubMenu(true);
    const childMenuData = menuData.filter((curMenu) =>
      curMenu.parent_Menu === menuDataa.id ? curMenu.title : console.log("")
    );
    const matchedMenu = pages.filter((curPage) =>
      curPage.slug === menuDataa.page_slug
        ? curPage.description
        : console.log("")
    );
    setsubPages(matchedMenu);
    setchildMenu(childMenuData);
    // <Demo />
    // setAnchorElNav(null);
  };

  const logOutHandler = () => {
    setIsLoggedIn(localStorage.removeItem("user", 0));
    navigate("/", { return: true });
  };

  const pageSlugHandler = (MenuId) => {
    const pageDesc = pages.filter((curPage) =>
      curPage.slug === MenuId ? curPage.description : console.log("")
    );
    setsubPages(pageDesc);
  };

  const allDataHandler = async () => {

    let allMenu = await axios.get("http://localhost:5000/admin/allmenu");
    setmenuData(allMenu.data.data);
    let allPages = await axios.get("http://localhost:5000/admin/allpages");
    setpages(allPages.data.data);
  }

  useEffect( () => {
    allDataHandler()
    // return allMenu;
  }, []);

  const phonenumber = (inputtxt) => {
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (inputtxt.value.match(phoneno)) {
      return true;
    } else {
      alert("message");
      return false;
    }
  };

  return (
    <div>
      <AppBar position="static" style={{ marginLeft: "0rem" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <div>
              <img
                src="./images/salon_logo.jpg"
                alt=""
                style={{ width: "15%", borderRadius: "50%", height: "30%" }}
                onClick={() => {
                  navigate("/", { return: true });
                }}
              />
            </div>

            <div style={{ spaceBetween: "px", display: "flex" }}>
              <PopupState popupId="demo-popup-menu">
                {(popupState) => (
                  <>
                    {menuData.map((menu) =>
                      menu.parent_Menu === 0 ? (
                        <Button
                          key={menu.id}
                          variant="contained"
                          style={{ display: "block" }}
                          {...bindTrigger(popupState)}
                          onMouseUp={() => handleChooseSubMenu(menu)}
                        >
                          {menu.title}
                        </Button>
                      ) : null
                    )}
                    <Menu {...bindMenu(popupState)}>
                      {childMenu.map((curMenu) => (
                        <MenuItem onClick={popupState.close} key={curMenu.id}>
                          <>
                            <Button
                              onClick={() => pageSlugHandler(curMenu.page_slug)}
                            >
                              {curMenu.title}
                            </Button>
                          </>
                        </MenuItem>
                      ))}
                    </Menu>
                  </>
                )}
              </PopupState>
            </div>

            {isLoggedIn ? (
              <>
                <Button
                  color="inherit"
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    marginLeft: "6rem",
                  }}
                  onClick={() => {
                    setAdmin(true);
                    navigate("/admin", { return: true });
                  }}
                >
                  Admin
                </Button>
                <Button
                  onClick={() => {
                    setIsLoggedIn(false);
                    localStorage.removeItem("user", 0);
                    navigate("/login", { return: true });
                  }}
                  style={{ backgroundColor: "white", marginLeft: "23rem" }}
                >
                  Logout
                </Button>
                <Button
                  onClick={() => {
                    setIsLoggedIn(false);
                    localStorage.removeItem("user", 0);
                    navigate("/login", { return: true });
                  }}
                  style={{ backgroundColor: "white", marginLeft: "23rem" }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                {/* <NavLink to="/getappointment"> */}
                <Button
                  style={{ backgroundColor: "white", marginLeft: "14rem" }}
                  onClick={() => setOpen(true)}
                >
                  Get Appointment
                </Button>
                {/* </NavLink> */}

                <Button
                  // onClick={logOutHandler}
                  color="secondary"
                  variant="contained"
                  onClick={() => {
                    localStorage.removeItem("user", 0);
                    // setIsLoggedIn(false);
                    navigate("/login", { return: true });
                  }}
                  style={{
                    position: "absolute",
                    right: "-10px",
                  }}
                >
                  Login
                </Button>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <div>
        {/* <Pages childMenu={childMenu} /> */}
        {/* {console.log(curPage.description)} */}
        {subPages.map((curPage, index) => (
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: curPage.description }}
          ></div>
        ))}
        {/* {subPages.map((curPage, index) =>  curPage.description  )} */}
      </div>

      {/* -------------------------========================================== */}

      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={MenuModelStyle}>
          <div>
            <IconButton
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                marginTop: "1px",
                marginRight: "5px",
              }}
              color="primary"
              aria-label="edit_record"
              component="span"
              onClick={() => setOpen(false)}
            >
              <CloseIcon />
            </IconButton>
            {/* <h1 style={{ textAlign: "center" }}>Update-Pages</h1> */}
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <h1 style={{ textAlign: "center", marginLeft: "0%" }}>
                Get Appointment
              </h1>
              {/* first_name, last_name, email,mobile, service_type(Static DD),
              date, time, remark, status[requested, confirmed, rejected] */}
              <form onSubmit={submitHandler}>
                <Box style={{ marginTop: "20px", margin: "3rem" }}>
                  <TextField
                    fullWidth
                    label="first name"
                    name="first_name"
                    value={first_name}
                    style={style}
                    onChange={(e) => setfirst_name(e.target.value)}
                    autoFocus
                  />
                  <TextField
                    fullWidth
                    label="last name"
                    name="last_name"
                    value={last_name}
                    style={style}
                    onChange={(e) => setlast_name(e.target.value)}
                    autoFocus
                  />

                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={email}
                    style={style}
                    onChange={(e) => setemail(e.target.value)}
                    autoFocus
                  />
                  {/* <TextField
                    fullWidth
                    label="Mobile"
                    name="mobile"
                    value={mobile}
                    onChange={(e) => setmobile(e.target.value)}
                    autoFocus
                  /> */}
                  <TextField
                    inputProps={{ inputMode: "numeric" }}
                    label="Mobile"
                    name="mobile"
                    value={mobile}
                    onChange={(e) => setmobile(e.target.value)}
                  />

                  <FormControl
                    sx={{ mt: 2, minWidth: 937, marginBottom: "2rem" }}
                  >
                    <InputLabel id="demo-simple-select-helper-label">
                      Select service type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      value={service_type}
                      label="Select Service Type"
                      onChange={(e) => {
                        setservice_type(e.target.value);
                      }}
                    >
                      <MenuItem value="0">
                        <em>None</em>
                      </MenuItem>

                      <MenuItem value="1"> 1 </MenuItem>
                      <MenuItem value="2"> 2 </MenuItem>
                      <MenuItem value="3"> 3 </MenuItem>
                    </Select>
                  </FormControl>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Stack spacing={3} style={style}>
                      <DesktopDatePicker
                        label="Date"
                        inputFormat="MM/dd/yyyy"
                        value={date}
                        onChange={handleDate}
                        renderInput={(params) => <TextField {...params} />}
                      />

                      <TimePicker
                        label="Time"
                        value={time}
                        style={style}
                        onChange={handleTime}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </Stack>
                  </LocalizationProvider>
                  <TextField
                    fullWidth
                    label="remark"
                    name="remark"
                    value={remark}
                    onChange={(e) => setremark(e.target.value)}
                    autoFocus
                  />

                  {/* {!title && <p>Plz fill the Title</p> } */}
                  <div>
                    <div style={{ marginTop: "20px", marginLeft: "44rem" }}>
                      <Button
                        // type="submit"
                        style={{
                          backgroundColor: "blue",
                          color: "white",
                          // marginTop: "20px",
                          marginRight: "5px",
                        }}
                        onClick={() => setOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        style={{
                          backgroundColor: "blue",
                          color: "white",
                          // marginTop: "20px",
                          // marginLeft: "15rem",
                        }}
                      >
                        Get Appointment
                      </Button>
                    </div>
                  </div>
                </Box>
              </form>
            </Typography>
          </div>
        </Box>
      </Modal>
      {/* -------------------------========================================== */}
    </div>
  );
};
