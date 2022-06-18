// import { FormControl, InputLabel } from "@mui/material";
// import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
// import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Tab, TablePagination } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toast, ToastContainer } from "react-toastify";
import ModalUnstyled from "@mui/base/ModalUnstyled";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import Tabs from "@mui/material/Tabs";

import { ConfirmProvider } from "material-ui-confirm";
import { useConfirm } from "material-ui-confirm";

import ButtonUnstyled, {
  buttonUnstyledClasses,
} from "@mui/base/ButtonUnstyled";
import { TableComponent } from "../TableComponent";
import { blue } from "@mui/material/colors";

const style = {
  position: "absolute",
  top: "42%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  height: 500,
  bgcolor: "background.paper",
  overflowY: "auto",
  border: "2px solid #000",
  marginTop: "10rem",
  p: 1,
  boxShadow: 24,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const MenuModelStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 470,
  height: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  overflowY: "auto",
  p: 1,
  boxShadow: 24,
};
const UpdateMenuModelStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 470,
  height: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  overflowY: "auto",
  p: 1,
  boxShadow: 24,
};

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled("div")`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const modelstyle = {
  position: "absolute",
  top: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  overflowY: "auto",
  p: 5,
  boxShadow: 24,
};
// Title, Parent Menu,Action
const columns = [
  { label: "Title", minWidth: 170 },
  { label: "Parent Menu", minWidth: 100 },
  {
    label: "Action",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
];

const CustomButtonRoot = styled("button")`
  font-family: IBM Plex Sans, sans-serif;
  font-weight: bold;
  font-size: 0.875rem;
  background-color: ${blue[500]};
  padding: 12px 24px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: ${blue[600]};
  }

  &.${buttonUnstyledClasses.active} {
    background-color: ${blue[700]};
  }

  &.${buttonUnstyledClasses.focusVisible} {
    box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1),
      0 0 0 5px rgba(0, 127, 255, 0.5);
    outline: none;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ManageMenu = ({ setadminPanel }) => {
  const [title, setTitle] = useState("");
  const [parent_Menu, setparent_Menu] = useState(0);
  const [update, setupdate] = useState(false);
  const [chr_delete, setchr_delete] = useState(0);
  const [updatedItemModal, setupdatedItemModal] = useState(false);
  const [updateState, setupdateState] = useState("");
  const [deleteMenu, setDeleteMenu] = useState({});
  const [deletePopup, setDeletePopup] = useState(false);

  // console.log("deleteMenu -->>",deleteMenu);

  const [data, setdata] = useState([]);
  const [open, setOpen] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const closeDeletePopup = () => setDeletePopup(false);

  function CustomButton(props) {
    return <ButtonUnstyled {...props} component={CustomButtonRoot} />;
  }

  const openUpdateModalHandler = () => {
    setOpen(false);
    setupdatedItemModal(true);
  };
  const closeUpdateModalHandler = () => {
    setTitle("");
    setparent_Menu(0);
    setupdatedItemModal(false);
  };
  const getALlMenus = async () => {

    let allMenu = await axios
      // .get("http://localhost:5000/admin/allmenu")
      .get("http://localhost:5000/admin/allmenu");
    console.log(allMenu.data.data);
    setdata(allMenu.data.data);
  
    return allMenu;
  }

  useEffect( () => {
    // .then((result) => setdata(result.data.allData))
    // .catch((errror) => console.log(errror));
    getALlMenus()

  }, [title, chr_delete]);

  const deleteHandler = async (id) => {
    // console.log("delete id -->>",id);
    setDeletePopup(false);
    const deleteddata = data.find((curData) => curData.id === id);
    try {
      // confirm("Are you sure you want to delete Menu")
      const result = await axios.put(
        `http://localhost:5000/admin/allmenu/delete/${deleteddata.id}`
      );
      setchr_delete(1);
      console.log(result);
      toast.success("Menu sucessfully Deleted");
      return result.data;
    } catch (error) {
      console.log(error);
    }
    // setdata(deleteddata);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!title) {
      toast.error("Please enter a title");
      return;
    }
    try {
      const result = await axios.post(
        "http://localhost:5000/admin/managemenu",
        {
          title: title,
          parent_Menu: parent_Menu,
          chr_delete: chr_delete
        }
      );
      console.log(result, chr_delete);
      toast.success(result.data.message);
      setTitle("");
      setparent_Menu(0);
      setOpen(false);
      return result.data;
    } catch (error) {
      toast.error(error.message);
      console.log("error: " + error);
    }
  };

  const updatedItemHandler = async (e) => {
    e.preventDefault();
    debugger;
    if (!title) {
      toast.error("Plz Fill the all the field");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("parent_Menu", parent_Menu);
      const result = await axios.put(
        `http://localhost:5000/admin/allmenu/${updateState}`,
        { title: title, parent_Menu: parent_Menu }
      );
      console.log(updateState);
      toast.success("Menu sucessfully Updated");
      closeUpdateModalHandler();
      return result.data;
    } catch (error) {
      toast.error(error);
      console.log("error: " + error);
    }
  };

  const editHandler = (id) => {
    setupdate(true);
    setupdatedItemModal(true);
    const updatedDetails = data.find((curData) => curData.id === id);

    console.log("updatedDetails===-==-=-=-->", updatedDetails);
    setTitle(updatedDetails.title);
    setparent_Menu(updatedDetails.parent_Menu);
    setupdateState(updatedDetails.id);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <header className="header">Manage Menu</header>

      {/* ========UPDATE START */}
      {update && (
        <Modal
          open={updatedItemModal}
          onClose={openUpdateModalHandler}
          // setupdatedItemModal(false);
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={UpdateMenuModelStyle}>
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
                onClick={closeUpdateModalHandler}
              >
                <CloseIcon />
              </IconButton>

              <Typography id="modal-modal-title" variant="h6" component="h2">
                <h1 style={{ textAlign: "center" }}>Update Menu</h1>
                <form onSubmit={updatedItemHandler} marginTop="4rem">
                  <Box style={{ marginTop: "20px", margin: "3rem" }}>
                    <TextField
                      fullWidth
                      label="Title"
                      name="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      autoFocus
                    />
                    <FormControl sx={{ mt: 2, minWidth: 352 }}>
                      <InputLabel id="demo-simple-select-helper-label">
                        Select Parent-Menu
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={parent_Menu}
                        label="Select Parent-Menu"
                        onChange={(e) => {
                          setparent_Menu(e.target.value);
                        }}
                      >
                        <MenuItem value="0">
                          <em>None</em>
                        </MenuItem>
                        {data.map((item) =>
                          item.parent_Menu === 0 ? (
                            <MenuItem value={item.id} key={item.id}>
                              {item.title}
                              {/* //  {item.parent_Menu==0 ? item.title  } */}
                              {/* // {console.log(item)} */}
                            </MenuItem>
                          ) : (
                            ""
                          )
                        )}
                      </Select>
                    </FormControl>
                    {/* {!title && <p>Plz fill the Title</p> } */}

                    {/* {!description && <p>Plz fill the description</p> } */}

                    {/* </div> */}
                    <div>
                      <div style={{ marginTop: "20px", marginLeft: "8.9rem" }}>
                        <Button
                          onClick={closeUpdateModalHandler}
                          style={{
                            backgroundColor: "blue",
                            color: "white",
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          style={{
                            backgroundColor: "blue",
                            color: "white",
                            // marginTop: "20px",
                            marginLeft: "14px",
                          }}
                        >
                          Update Menu
                        </Button>
                      </div>
                    </div>
                  </Box>
                </form>
              </Typography>
            </div>
          </Box>
        </Modal>
      )}

      {/* ------------UPDATE END */}
      <div>
        <Button
          variant="contained"
          onClick={handleOpen}
          style={{
            position: "absolute",
            right: 0,
            right: "4.4%",
            top: "5rem",
            width: "auto",
          }}
        >
          Add Menu
        </Button>
        <StyledModal
          aria-labelledby="unstyled-modal-title"
          aria-describedby="unstyled-modal-description"
          open={open}
          BackdropComponent={Backdrop}
        >
          <Box
            style={{ marginLeft: "28rem" }}
            component="form"
            noValidate
            onSubmit={submitHandler}
            sx={modelstyle}
          >
            <div style={{ marginTop: "-3rem" }}>
              <IconButton
                // style={{ marginLeft: "25rem", cursor: "pointer", color: "white", backgroundColor: "red", borderRadius: "3rem", padding: "3px"}}
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
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon />
              </IconButton>
              <h1 style={{ marginLeft: "7rem" }}>Add a new menu</h1>
            </div>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
            <br />

            {/* </div> */}

            <>
              <FormControl sx={{ mt: 2, minWidth: 460 }}>
                <InputLabel id="demo-simple-select-helper-label">
                  Select Parent-Menu
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={parent_Menu}
                  label="Select Parent-Menu"
                  onChange={(e) => {
                    setparent_Menu(e.target.value);
                  }}
                >
                  <MenuItem value="0">
                    <em>None</em>
                  </MenuItem>
                  {data.map((item) =>
                    item.parent_Menu === 0 ? (
                      <MenuItem value={item.id} key={item.id}>
                        {item.title}
                        {/* //  {item.parent_Menu==0 ? item.title  } */}
                        {/* // {console.log(item)} */}
                      </MenuItem>
                    ) : (
                      ""
                    )
                  )}
                </Select>
              </FormControl>
            </>
            <div>
              <div style={{ marginTop: "20px", marginLeft: "16rem" }}>
                <Button
                  variant="contained"
                  href="#contained-buttons"
                  onClick={() => {
                    setOpen(false);
                  }}
                  style={{ color: "yellow", marginRight: "20px" }}
                >
                  Cancel{" "}
                </Button>
                <Button
                  type="submit"
                  style={{
                    backgroundColor: "blue",
                    color: "white",
                  }}
                >
                  Add Menu
                </Button>
              </div>
            </div>
          </Box>
        </StyledModal>
      </div>

      <div>
        <Dialog
          open={deletePopup}
          onClose={closeDeletePopup}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure want to delete this menu ?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This menu will delete permanently
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDeletePopup}>Cancel</Button>
            <Button onClick={() => deleteHandler(deleteMenu.id)} autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      {data.length > 0 ? (
        <div>
          <div className="main">
            <Paper
              sx={{
                // top: "4rem",
                height: "28rem",
                // width: "80.4%",
                padding: "6rem",
                overflow: "hidden",
                padding: "3.5rem",
                // left: "25rem",
              }}
            >
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={row.id}
                          >
                            {console.log(data)}
                            {/* {columns.map((column) => {
                          const value = row[column.id]; */}

                            <>
                              <TableCell >{row.title}</TableCell>
                              <TableCell>
                                {data.find((all) => all.id === row.parent_Menu)
                                  ?.title || "-"}
                              </TableCell>
                              <TableCell  align="right">
                                <EditIcon
                                  style={{
                                    color: "blue",
                                    marginRight: "20px",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => editHandler(row.id)}
                                />

                                <DeleteIcon
                                  style={{ color: "red", cursor: "pointer" }}
                                  onClick={() => {
                                    setDeleteMenu(row);
                                    setDeletePopup(true);
                                  }}
                                />
                              </TableCell>
                            </>

                            {/* })} */}
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </div>
        </div>
      ) : (
        <>
          <h1>No Menu Found!!!</h1> <p>Plz add Menu..!!</p>
        </>
      )}

        <div style={{ display: "none" }}>
          <TableContainer component={Paper} style={style}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Title</StyledTableCell>
                  <StyledTableCell align="center">Parent Menu</StyledTableCell>
                  <StyledTableCell align="center">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item) => (
                  <StyledTableRow key={item.id}>
                    <StyledTableCell align="center">
                      {item.title}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {data.find((all) => all.id === item.parent_Menu)?.title ||
                        "-"}
                    </StyledTableCell>
                    {/* <EditIcon style={{ color: "blue", marginRight: "px" }} />
                  <DeleteIcon style={{ color: "red" }} /> */}
                    <StyledTableCell align="center">
                      <EditIcon
                        style={{
                          color: "blue",
                          marginRight: "20px",
                          cursor: "pointer",
                        }}
                        onClick={() => editHandler(item.id)}
                      />

                      <DeleteIcon
                        style={{ color: "red", cursor: "pointer" }}
                        onClick={() => {
                          setDeleteMenu(item);
                          setDeletePopup(true);
                        }}
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
     
    </>
  );
};
