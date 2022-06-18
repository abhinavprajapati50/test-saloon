import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {  TablePagination, TextField } from "@mui/material";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Texteditor } from "../../text-edit/texteditor";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";


import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";


// import { Button } from "@mui/material";

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

const style = {
  position: "absolute",
  // top: "42.5%",
  // left: "50%",
  // transform: "translate(-50%, -50%)",
  // width: 100%,

  marginBottom: "1rem",
  bgcolor: "background.paper",
  border: "2px solid #000",
  marginTop: "5rem",
  marginLeft: 10,
  overflowY: "auto",
  p: 1,
  boxShadow: 24,
};
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
// Title, Image,  Short Description,  Long Description,  Action
const columns = [
  { label: "Title", minWidth: 170 },
  { label: "Image", minWidth: 100 },
  {
    label: "Short Description",
    minWidth: 10,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  { label: "Long Description",align: "center", minWidth: 100 },
  { label: "Action", minWidth: 100 },
];

export const Manage_Services = ({ set }) => {
  const [open, setOpen] = useState(false);
  const [updatedItemModal, setupdatedItemModal] = useState(false);

  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [short_description, setshort_description] = useState("");
  const [long_description, setlong_description] = useState("");
  const [chr_delete, setchr_delete] = useState(0);
  const [parentService, setParentService] = useState(0);

  // console.log("parent Service ---->>>", parentService);

  const [data, setdata] = useState([]);

  console.log("all service ->", data);

  const [updateState, setupdateState] = useState("");
  const [update, setupdate] = useState(false);

  const [deleteService, setdeleteService] = useState({});
  const [deleteServicePopup, setdeleteServicePopup] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);


  const apiFunc = async () => {
    try {
      const result = await axios.get("http://localhost:5000/admin/allservice");
      setdata(result.data.data);
      return result;
    } catch (error) {
      toast.error(error.message);
      return error;
    }
  };
  useEffect(() => {
    apiFunc();
  }, [title, imageUrl, short_description, long_description]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const openUpdateModalHandler = () => {
    setOpen(false);
    setupdatedItemModal(true);
    setParentService(0);
  };
  const closeUpdateModalHandler = () => {
    clearForm();
    setupdatedItemModal(false);
    setParentService(0);
  };

  const deleteHandler = async (id) => {
    setdeleteServicePopup(false);

    const updatedDetails = data.find((curData) => curData.id === id);
    try {
      console.log(updatedDetails);
      const result = await axios.put(
        `http://localhost:5000/admin/allservice/delete/${updatedDetails.id}`
      );
      setchr_delete(1);
      apiFunc();
      clearForm();
      toast.success("Service sucessfully Deleted");
      return result.data;
    } catch (error) {
      console.log("error: " + error);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    debugger;
    setupdatedItemModal(false);
    setupdate(false);
    if (!title || !imageUrl || !short_description || !long_description) {
      toast.error("Plz Fill all the field");
      return;
    }
    try {
      const formData = new FormData();
      // chr_delete
      //   console.log("the data", title, slug, imageUrl.name);
      formData.append("title", title);
      console.log(imageUrl.name);
      formData.append("imageUrl", imageUrl);
      formData.append("short_description", short_description);
      formData.append("long_description", long_description);
      formData.append("parent_id", parentService);
      formData.append(`chr_delete`, chr_delete);
      const result = await axios.post(
        "http://localhost:5000/admin/allservice",
        formData
      );

      console.log("",result);

      toast.success(result.data.message);
      // setOpen(false);
      apiFunc();
      handleClose();
      setTitle("");
      setshort_description("");
      setParentService(0);
      // openUpdateModalHandler()
      return result.data;
    } catch (error) {
      toast.error(error);
      return console.log("error: " + error);
    }
  };

  const updatedItemHandler = async (e) => {
    e.preventDefault();
    if (!title || !imageUrl || !short_description || !long_description) {
      toast.error("Plz Fill the all the field");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("imageUrl", imageUrl);
      formData.append("short_description", short_description);
      formData.append("long_description", long_description);
      console.log(updateState);
      const result = await axios.put(
        `http://localhost:5000/admin/allservice/${updateState}`,
        formData
      );
      console.log("=======UPLOAD DATA RESULT ", result.data);
      toast.success(result.data.message);
      setTitle("");
      closeUpdateModalHandler();
      // open(false);
      // console.log(result.data);
      apiFunc();
      clearForm();
      return result.data;
    } catch (error) {
      console.log(error);
      toast.error("Invalid Credentials");
      console.log("error: " + error);
    }
  };

  const editHandler = (id) => {
    // if () {

    // }
    setupdate(true);
    setupdatedItemModal(true);
    apiFunc();
    const updatedDetails = data.find((curData) => curData.id === id);

    console.log("updatedDetails===-==-=-=-->", updatedDetails);
    setTitle(updatedDetails.title);
    setImageUrl(updatedDetails.imageUrl);
    setshort_description(updatedDetails.short_description);
    setlong_description(updatedDetails.long_description);
    setParentService(updatedDetails.parent_id);
    setupdateState(updatedDetails.id);
    console.log(
      `the update the image---- after clilck edit${updatedDetails.imageUrl}`
    );

    // setdata(updatedData)
    // const formData = new FormData();
    // formData.append("image",data.image);
    // formData.append("slug", slug);
    // formData.append("description", description);

    // axios
    //   .put(`http://localhost:5000/admin/allservice/${id}`)
    //   .then((response) => response);
  };

  const clearForm = (result) => {
    setTitle("");
    setImageUrl("");
    setshort_description("");
    setlong_description("");
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
      <header className="header">Manage Services</header>
      <div
        style={{
          marginTop: "0rem",
          alignItems: "center",
        }}
      >
        <div>
          <Button
            variant="contained"
            onClick={handleOpen}
            style={{
              position: "absolute",
              right: 0,
              marginRight: "7.4%",
              marginTop: "20px",
              width: "auto",
            }}
          >
            Add Service
          </Button>
        </div>
      </div>

      {/* ------------UPdated Item */}
      {update && (
        <Modal
          open={updatedItemModal}
          onClose={openUpdateModalHandler}
          // setupdatedItemModal(false);
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
                onClick={closeUpdateModalHandler}
              >
                <CloseIcon />
              </IconButton>

              {/* <h1 style={{ textAlign: "center" }}>Update-Pages</h1> */}
              <Typography id="modal-modal-title" variant="h6" component="h2">
                <h1 style={{ textAlign: "center", marginLeft: "0%" }}>
                  Update Service
                </h1>
                <form onSubmit={updatedItemHandler}>
                  <Box style={{ marginTop: "20px", margin: "3rem" }}>
                    <TextField
                      fullWidth
                      label="Title"
                      name="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      style={{ marginTop: "1rem" }}
                      autoFocus
                    />
                    <TextField
                      fullWidth
                      label="Short description"
                      name="Short description"
                      value={short_description}
                      onChange={(e) => setshort_description(e.target.value)}
                      style={{ marginTop: "1rem" }}
                      autoFocus
                    />
                    {/* <TextField
                      fullWidth
                      label="long_description"
                      name="long_description"
                      value={long_description}
                      onChange={(e) => setlong_description(e.target.value)}
                      style={{ marginTop: "1rem" }}
                      autoFocus
                    /> */}

                    <Texteditor
                      setlong_description={setlong_description}
                      long_description={long_description}
                      update={update}
                    />
                    {/* {!title && <p>Plz fill the Title</p> } */}

                    <FormControl sx={{ mt: 2, minWidth: 352 }}>
                      <InputLabel id="demo-simple-select-helper-label">
                        Select Parent Service
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={parentService}
                        label="Select Parent Service"
                        onChange={(e) => {
                          setParentService(e.target.value);
                        }}
                      >
                        <MenuItem value={0}>None</MenuItem>
                        {data.map((service) => (
                          <MenuItem value={service.id}>
                            {service.title}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <input
                      type="file"
                      name="image"
                      id=""
                      onChange={(e) => setImageUrl(e.target.files[0])}
                      style={{ marginTop: "1rem" }}
                    />
                    {console.log("-------the imaghe", imageUrl)}

                    {/* {!description && <p>Plz fill the description</p> } */}

                    {/* </div> */}
                    <div>
                      <Button
                        variant="contained"
                        type="cancel"
                        style={{
                          position: "absolute",
                          right: 165,
                          margin: "0px 15px",
                        }}
                        onClick={closeUpdateModalHandler}
                      >
                        Cancel
                      </Button>

                      <Button
                        variant="contained"
                        type="submit"
                        style={{
                          position: "absolute",
                          right: 0,
                          margin: "0px 15px",
                        }}
                      >
                        Update Service
                      </Button>
                    </div>
                  </Box>
                </form>
              </Typography>
            </div>
          </Box>
        </Modal>
      )}

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
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
            {/* <h1 style={{ textAlign: "center" }}>Update-Pages</h1> */}
            <Typography id="modal-modal-title">
              <h1
                style={{
                  textAlign: "center",
                  marginLeft: "0%",
                  marginBottom: 0,
                }}
              >
                Add Service
              </h1>
              <form onSubmit={submitHandler}>
                <Box style={{ margin: "2rem" }}>
                  <TextField
                    fullWidth
                    label="Title"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{ marginTop: "1rem" }}
                    autoFocus
                  />

                  <TextField
                    fullWidth
                    label="Short description"
                    name="Short description"
                    value={short_description}
                    onChange={(e) => setshort_description(e.target.value)}
                    style={{ marginTop: "1rem" }}
                    autoFocus
                  />
                  {/* <TextField
                    fullWidth
                    label="long_description"
                    name="long_description"
                    value={long_description}
                    onChange={(e) => setlong_description(e.target.value)}
                    style={{marginTop:"1rem"}}
                    autoFocus
                  /> */}

                  <Texteditor
                    autoFocus
                    setlong_description={setlong_description}
                    long_description={long_description}
                    update={update}
                  />
                  {/* {!title && <p>Plz fill the Title</p> } */}

                  <FormControl sx={{ mt: 2, minWidth: 352 }}>
                    <InputLabel id="demo-simple-select-helper-label">
                      Select Parent Service
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      value={parentService}
                      label="Select Parent Service"
                      onChange={(e) => {
                        setParentService(e.target.value);
                      }}
                    >
                      <MenuItem value={0}>None</MenuItem>
                      {data.map((service) => (
                        <MenuItem value={service.id}>{service.title}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <input
                    type="file"
                    name="image"
                    id=""
                    onChange={(e) => setImageUrl(e.target.files[0])}
                    style={{ marginTop: "1rem" }}
                  />

                  {/* {!description && <p>Plz fill the description</p> } */}

                  {/* </div> */}
                  <div>
                    <Button
                      variant="contained"
                      type="cancel"
                      style={{
                        position: "absolute",
                        right: 180,
                        margin: "0px 15px",
                      }}
                      onClick={handleClose}
                    >
                      Cancel
                    </Button>

                    <Button
                      variant="contained"
                      type="submit"
                      style={{
                        position: "absolute",
                        right: 37,
                        margin: "0px 15px",
                      }}
                    >
                      Add Service
                    </Button>
                  </div>
                </Box>
              </form>
            </Typography>
          </div>
        </Box>
      </Modal>

      <div>
        <Dialog
          open={deleteServicePopup}
          // onClose={closeDeletePopup}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure want to delete this service ?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This service will delete permanently
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setdeleteServicePopup(false)}>Cancel</Button>
            <Button onClick={() => deleteHandler(deleteService.id)} autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      {/* {data.map((curItem, i) => <p>{ curItem }</p> )} */}

      {data.length > 0  ? <div className="table">
        <div>
          <div className="main">
            <Paper
              sx={{
                // top: "4rem",
                height: "28rem",
                // width: "80.4%",
                padding: "3rem",
                overflow: "hidden",
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
                                {/* Title,Image, Short Description, Long Description, Action */}
                            <>
                              <TableCell key={row.id} align="left">{row.title}</TableCell>
                              <TableCell align="left">   {row.imageUrl} </TableCell>
                              <TableCell align="left" >   {row.short_description} </TableCell>
                              <TableCell align="center">   {row.long_description} </TableCell>
                              <TableCell key={row.id} align="left">
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
                                    setdeleteService(row);
                                    setdeleteServicePopup(true);
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
      </div> : (
        <>
          <h1>No Service Found!!!</h1> <p>Plz Page Menu..!!</p>
        </>)}
      <>
        <div style={(style, { display: "none" })}>
          <TableContainer
            component={Paper}
            style={{ overflowY: "auto", width: "100%", minHeight: "3rem" }}
          >
            <Table sx={{ minWidth: 1000 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Title</StyledTableCell>
                  <StyledTableCell>Image</StyledTableCell>
                  <StyledTableCell>Short Description</StyledTableCell>
                  <StyledTableCell>Long Description</StyledTableCell>
                  <StyledTableCell>Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell align="left">{row.title}</StyledTableCell>
                    <StyledTableCell align="left">
                      {row.imageUrl}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {row.short_description}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {row.long_description}
                    </StyledTableCell>
                    <StyledTableCell align="left">
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
                          setdeleteService(row);
                          setdeleteServicePopup(true);
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
    </>
  );
};

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import Modal from "@mui/material/Modal";
// import { TextField } from "@mui/material";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Texteditor } from "../../text-edit/texteditor";

// import { styled } from "@mui/material/styles";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";

// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";

// import InputLabel from "@mui/material/InputLabel";
// import FormControl from "@mui/material/FormControl";
// import MenuItem from "@mui/material/MenuItem";
// import Select from "@mui/material/Select";
// import { useConfirm } from "material-ui-confirm";

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//     [`&.${tableCellClasses.head}`]: {
//       backgroundColor: theme.palette.common.black,
//       color: theme.palette.common.white,
//     },
//     [`&.${tableCellClasses.body}`]: {
//       fontSize: 14,
//     },
//   }));

//   const StyledTableRow = styled(TableRow)(({ theme }) => ({
//     "&:nth-of-type(odd)": {
//       backgroundColor: theme.palette.action.hover,
//     },
//     // hide last border
//     "&:last-child td, &:last-child th": {
//       border: 0,
//     },
//   }));

//   const style = {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     width: 710,
//     height: 500,
//     marginBottom: "1rem",
//     bgcolor: "background.paper",
//     border: "2px solid #000",
//     marginTop: "10rem",
//     overflowY: "auto",
//     p: 1,
//     boxShadow: 24,
//   };
//   const MenuModelStyle = {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     width: 470,
//     height: 700,
//     bgcolor: "background.paper",
//     border: "2px solid #000",
//     overflowY: "auto",
//     p: 1,
//     boxShadow: 24,
//   };

// export const Manage_Services = () => {
//   const [serviceData, setdata] = useState([]);
//   const [title, settitle] = useState("");
//   const [short_description, setshort_description] = useState("");
//   const [long_description, setlong_description] = useState("");
//   const [imageUrl, setImageUrl] = useState(null);
//   const [chr_delete, setchr_delete] = useState(0);

//   const [open, setOpen] = useState(false);
//     const [updatedItemModal, setupdatedItemModal] = useState(false);

//     const [update, setupdate] = useState(false);
//     const [updateState, setupdateState] = useState("");

//     console.log(serviceData);

//   useEffect(async () => {
//     let allServices = await axios.get("http://localhost:5000/admin/allservice");
//     console.log(allServices.data);
//     setdata(allServices.data.data);
//     return allServices;
//   }, []);
//     console.log("Services");

//     const handleOpen = () => setOpen(true);
//     const handleClose = () => setOpen(false);

//     const openUpdateModalHandler = () => {
//         setOpen(false);
//         setupdatedItemModal(true);
//       };
//       const closeUpdateModalHandler = () => {
//         clearForm();
//         setupdatedItemModal(false);
//       };

//     //   const deleteHandler = async (id) => {
//     //     // confirm({ description: `This will permanently delete .` })

//     //     const updatedDetails = data.find((curData) => curData.id === id);
//     //     try {
//     //       console.log(updatedDetails);
//     //       const result = await axios.put(
//     //         `http://localhost:5000/admin/allservice/delete/${updatedDetails.id}`
//     //       );
//     //       setchr_delete(1);
//     //       apiFunc();
//     //       clearForm();
//     //       return result.data;
//     //     } catch (error) {
//     //       console.log("error: " + error);
//     //     }
//     //   };

//       const submitHandler = async (e) => {
//         e.preventDefault();
//         debugger;
//         setupdatedItemModal(false);
//         setupdate(false);
//         if (!title || !slug || !image || !description) {
//           toast.error("Plz Fill all the field");
//           return;
//         }
//         try {
//           const formData = new FormData();
//           // chr_delete
//           console.log("the data", title, slug, image.name);
//           formData.append("title", title);
//           formData.append("slug", slug);
//           formData.append("image", image.name);
//           formData.append("description", description);
//           formData.append(`chr_delete`, chr_delete);
//           formData.append(`parentMenu`, parentMenu);
//           const result = await axios.post(
//             "http://localhost:5000/admin/allservice",
//             formData
//           );

//           toast.success(result.data.message);
//           // setOpen(false);
//         //   apiFunc();
//           handleClose();
//           // openUpdateModalHandler()
//           return result.data;
//         } catch (error) {
//           toast.error(error);
//           return console.log("error: " + error);
//         }
//       };

//       const updatedItemHandler = async (e) => {
//         e.preventDefault();
//         if (!title || !slug || !image || !description) {
//           toast.error("Plz Fill the all the field");
//           return;
//         }

//         try {
//           const formData = new FormData();

//           formData.append("title", title);
//           formData.append("slug", slug);
//           formData.append("image", image.name);
//           formData.append("description", description);
//           formData.append(`parentMenu`, parentMenu);
//           console.log(updateState);
//           const result = await axios.put(
//             `http://localhost:5000/admin/allservice/${updateState}`,
//             formData
//           );
//           toast.success("Page sucessfully Updated");
//           setTitle("");
//           closeUpdateModalHandler();
//           // open(false);
//           console.log(result.data);
//         //   apiFunc();
//           clearForm();
//           return result.data;
//         } catch (error) {
//           console.log(error);
//           toast.error("Invalid Credentials");
//           console.log("error: " + error);
//         }
//       };

//       const editHandler = (id) => {
//         setupdate(true);
//         setupdatedItemModal(true);
//         // apiFunc();
//         const updatedDetails = serviceData.find((curData) => curData.id === id);

//         console.log("updatedDetails===-==-=-=-->", updatedDetails.description);
//         setTitle(updatedDetails.title);
//         setslug(updatedDetails.slug);
//         setImageUrl(updatedDetails.image);
//         setDescription(updatedDetails.description);
//         setupdateState(updatedDetails.id);

//         // setdata(updatedData)
//         // const formData = new FormData();
//         // formData.append("image",data.image);
//         // formData.append("slug", slug);
//         // formData.append("description", description);

//         // axios
//         //   .put(`http://localhost:5000/admin/allservice/${id}`)
//         //   .then((response) => response);
//       };

//       const clearForm = (result) => {
//         setTitle("");
//         setslug("");
//         setDescription("");
//         setImageUrl("");
//       };

// //   console.log(serviceData);
//   return (
//     <>
//       <>
//         <div
//           style={{
//             marginTop: "0rem",
//             alignItems: "center",
//           }}
//         >
//           <h1 style={{ marginLeft: "38%" }}> Manage Page</h1>
//           <div>
//             <Button
//               onClick={handleOpen}
//               style={{
//                 backgroundColor: "blue",
//                 color: "white",
//                 marginLeft: "58%",
//               }}
//             >
//               Add Service
//             </Button>
//           </div>
//         </div>

//         {/* ------------UPdated Item */}
//         <ToastContainer />
//         <Modal
//           open={open}
//           aria-labelledby="modal-modal-title"
//           aria-describedby="modal-modal-description"
//         >
//           <Box sx={MenuModelStyle}>
//             <div>
//               <h1
//                 style={{ textAlign: "right", cursor: "pointer", color: "red" }}
//                 onClick={handleClose}
//               >
//                 X
//               </h1>
//               {/* <h1 style={{ textAlign: "center" }}>Update-Pages</h1> */}
//               <Typography id="modal-modal-title" variant="h6" component="h2">
//                 <h1 style={{ textAlign: "center", marginLeft: "0%" }}>
//                   Add Page
//                 </h1>
//                 <form onSubmit={submitHandler}>
//                   <Box style={{ marginTop: "20px", margin: "3rem" }}>
//                     <TextField
//                       fullWidth
//                       label="Title"
//                       name="title"
//                       value={title}
//                       onChange={(e) => setTitle(e.target.value)}
//                       autoFocus
//                     />
//                     {/* {!title && <p>Plz fill the Title</p> } */}
//                     <TextField
//                       fullWidth
//                       label="Slug"
//                       name="slug"
//                       value={slug}
//                       onChange={(e) => setslug(e.target.value)}
//                       style={{ marginTop: "20px" }}
//                       autoFocus
//                     />

//                     <input
//                       type="file"
//                       name="image"
//                       id=""
//                       onChange={(e) => setImageUrl(e.target.files[0])}
//                     />
//                     <Texteditor setDescription={setDescription} />
//                     <FormControl sx={{ mt: 2, minWidth: 340 }}>
//                       <InputLabel id="demo-simple-select-helper-label">
//                         Select ParentMenu
//                       </InputLabel>
//                       <Select
//                         labelId="demo-simple-select-helper-label"
//                         id="demo-simple-select-helper"
//                         value={parentMenu}
//                         label="SelectMenu"
//                         onChange={(e) => {
//                           setparentMenu(e.target.value);
//                         }}
//                       >
//                         <MenuItem value="0">
//                           <em>None</em>
//                         </MenuItem>
//                         {menuData.map((item) => (
//                           <MenuItem value={item.id} key={item.id}>
//                             {item.title}
//                           </MenuItem>
//                         ))}
//                       </Select>
//                     </FormControl>

//                     {/* {!description && <p>Plz fill the description</p> } */}

//                     {/* </div> */}
//                     <div>
//                       <div>
//                         <Button
//                           type="submit"
//                           style={{
//                             backgroundColor: "blue",
//                             color: "white",
//                             marginTop: "20px",
//                             marginLeft: "4rem",
//                           }}
//                         >
//                           Add-Page
//                         </Button>
//                       </div>
//                     </div>
//                   </Box>
//                 </form>
//               </Typography>
//             </div>
//           </Box>
//         </Modal>

//         {/* {data.map((curItem, i) => <p>{ curItem }</p> )} */}
//         <>
//           <div style={{ paddingBottom: "0rem" }}>
//             <div style={style}>
//               <TableContainer
//                 component={Paper}
//                 style={{ overflowY: "auto", width: "100%", minHeight: "3rem" }}
//               >
//                 <Table sx={{ maxWidth: 710 }} aria-label="customized table">
//                   <TableHead>
//                     <TableRow>
//                       <StyledTableCell>Title</StyledTableCell>
//                       <StyledTableCell>Slug</StyledTableCell>
//                       <StyledTableCell>Image</StyledTableCell>
//                       <StyledTableCell>Description</StyledTableCell>
//                       <StyledTableCell>Action</StyledTableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {serviceData.map((row) => (
//                       <StyledTableRow key={row.id}>
//                         <StyledTableCell align="left">
//                           {row.title}
//                         </StyledTableCell>
//                         <StyledTableCell align="left">
//                           {row.slug}
//                         </StyledTableCell>
//                         <StyledTableCell align="left">
//                           {row.image}
//                         </StyledTableCell>
//                         <StyledTableCell align="left">
//                           {row.description}
//                         </StyledTableCell>
//                         <EditIcon
//                           style={{
//                             color: "blue",
//                             marginRight: "20px",
//                             cursor: "pointer",
//                           }}
//                           onClick={() => editHandler(row.id)}
//                         />
//                         <DeleteIcon
//                           style={{ color: "red", cursor: "pointer" }}
//                           onClick={() => deleteHandler(row.id)}
//                         />
//                       </StyledTableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </div>
//           </div>
//         </>
//       </>
//     </>
//   );
// };
