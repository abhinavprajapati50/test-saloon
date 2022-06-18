import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {  TablePagination, TextField } from "@mui/material";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
// import { Texteditor } from "../../text-edit/texteditor";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
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
// import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { TextEditorManagepage } from "../../text-edit/Text_Editor_Manage_page";
// import FormLabel from "@mui/material/FormLabel";

// import { Button } from "@mui/material";

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   "&:nth-of-type(odd)": {
//     backgroundColor: theme.palette.action.hover,
//   },
//   // hide last border
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));

// const style = {
//   position: "absolute",
//   top: "42.3%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 710,
//   height: 500,
//   marginBottom: "1rem",
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   marginTop: "10rem",
//   overflowY: "auto",
//   p: 1,
//   boxShadow: 24,
// };
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
// Title,Slug,Image,Description,Action

const columns = [
  {id: 1, label: "Title", minWidth: 100 },
  { id: 2, label: "Slug", minWidth: 100 },
  { id: 3, label: "Image", minWidth: 100 },
  { id: 4, label: "Description", minWidth: 180 },
  // { label: "Action", minWidth: 100 },
  {
    id: 5,
    label: "Action",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
];

export const ManagePages = ({ set }) => {
  const [open, setOpen] = useState(false);
  const [updatedItemModal, setupdatedItemModal] = useState(false);

  const [title, setTitle] = useState("");
  const [slug, setslug] = useState("");
  const [image, setimage] = useState("");
  const [description, setDescription] = useState([]);
  const [chr_delete, setchr_delete] = useState(0);
  const [data, setdata] = useState([]);
  const [updateState, setupdateState] = useState("");
  const [update, setupdate] = useState(false);
  const [menuData, setmenuData] = useState([]);
  const [parentMenu, setparentMenu] = useState(0);
  const [serviceData, setServiceData] = useState([]);
  const [parentService, setParentService] = useState(0);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  // const confirm = useConfirm();

  //radio button selection
  const [radioValue, setRadioValue] = useState("");

  // console.log("parentService --->>", parentService);

  const [deletePage, setDeletePage] = useState({});
  const [deletePagePopup, setdeletePagePopup] = useState(false);
  // console.log("delete page -->>", deletePage);

  const apiFunc = async () => {
    try {
      const result = await axios.get("http://localhost:5000/admin/allpages");
      setdata(result.data.data);
      return result;
    } catch (error) {
      toast.error(error.message);
      return error;
    }
  };
  useEffect(() => {
    apiFunc();
    allMenuHandler()
    allServices()
  }, [title, slug, image, description]);

  const allMenuHandler = async () => {
    let allMenu = await axios
      // .get("http://localhost:5000/admin/allmenu")
      .get("http://localhost:5000/admin/allmenu");
    setmenuData(allMenu.data.data);
    return allMenu;
  }

  const allServices = async () => {
    let allservice = await axios.get("http://localhost:5000/admin/allservice");
    setServiceData(allservice.data.data);
    return allservice;
  }

  // useEffect(() => {
  //   // .then((result) => setdata(result.data.allData))
  //   // .catch((errror) => console.log(errror));
  // }, [data]);

  // useEffect(() => {
  // }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setRadioValue("");
  };

  const openUpdateModalHandler = () => {
    setOpen(false);
    setupdatedItemModal(true);
  };
  const closeUpdateModalHandler = () => {
    clearForm();
    setupdatedItemModal(false);
    setRadioValue("");
  };

  //radio button selection
  const handleChange = (event) => {
    console.log("event.target.value radio ---->>", event.target.value);
    setRadioValue(event.target.value);
  };

  const deleteHandler = async (id) => {
    console.log("delete id ->", id);
    setdeletePagePopup(false);
    const updatedDetails = data.find((curData) => curData.id === id);
    try {
      console.log(updatedDetails);
      const result = await axios.put(
        `http://localhost:5000/admin/allpages/delete/${updatedDetails.id}`
      );
      setchr_delete(1);
      apiFunc();
      clearForm();
      toast.success("Page sucessfully Deleted");
      return result.data;
    } catch (error) {
      console.log("error: " + error);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setupdatedItemModal(false);
    setupdate(false);
    if (!title || !slug  || !description) {
      toast.error("Plz Fill all the field");
      return;
    }
    try {
      const formData = new FormData();
      // // chr_delete
      // console.log("the data", image);
      formData.append("title", title);
      formData.append("slug", slug);
      formData.append("image", image);
      formData.append("description", description);
      formData.append(`chr_delete`, chr_delete);
      formData.append(`parentMenu`, parentMenu);
      formData.append(`parentService`, parentService);
      console.log(formData);
      // const pageData = { title, slug, description, images, chr_delete, parentMenu, parentService  }
      const result = await axios.post(
        "http://localhost:5000/admin/allpages",
        formData
      );
      console.log(result);
      toast.success(result.data.message);
      // setOpen(false);
      setTitle("");
      setslug("");
      setParentService(0);
      apiFunc();
      handleClose();
      // openUpdateModalHandler()
      return result.data;
    } catch (error) {
      toast.error(error);
      return console.log("error: " + error);
    }
  };

  const updatedItemHandler = async (e) => {
    e.preventDefault();
    if (!title || !slug || !image || !description) {
      toast.error("Plz Fill the all the field");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("slug", slug);
      formData.append("image", image);
      formData.append("description", description);
      formData.append(`parentMenu`, parentMenu);
      formData.append(`parentService`, parentService);
      console.log(updateState);
      const result = await axios.put(
        `http://localhost:5000/admin/allpages/${updateState}`,
        formData
      );
      toast.success("Page sucessfully Updated");
      setTitle("");
      closeUpdateModalHandler();
      // open(false);
      console.log(result.data.data);
      apiFunc();
      clearForm();
      return result.data.data;
    } catch (error) {
      console.log(error);
      toast.error("Invalid Credentials");
      console.log("error: " + error);
    }
  };

  const editHandler = (id) => {
    setupdate(true);
    setupdatedItemModal(true);
    apiFunc();
    const updatedDetails = data.find((curData) => curData.id === id);

    console.log("updatedDetails===-==-=-=-->", updatedDetails);
    setTitle(updatedDetails.title);
    setslug(updatedDetails.slug);
    setimage(updatedDetails.image);
    setDescription(updatedDetails.description);
    setupdateState(updatedDetails.id);

    // const updateMenu = allmenu.find((curMenu) => {})

    console.log("menuData --->>>", menuData);

    if (updatedDetails) {
      const oneMenu = menuData.find(
        (menuobj) => menuobj.page_slug === updatedDetails.slug
      );

      if (oneMenu) {
        setRadioValue("Select ParentMenu");
        setparentMenu(oneMenu.id);
      }
    }

    if (updatedDetails) {
      const oneService = serviceData.find(
        (serdata) => serdata.page_slug === updatedDetails.slug
      );
      if (oneService) {
        setRadioValue("Select Parent Service");
        setParentService(oneService.id);
      }
    }

    // setdata(updatedData)
    // const formData = new FormData();
    // formData.append("image",data.image);
    // formData.append("slug", slug);
    // formData.append("description", description);

    // axios
    //   .put(`http://localhost:5000/admin/allpages/${id}`)
    //   .then((response) => response);
  };

  const clearForm = (result) => {
    setTitle("");
    setslug("");
    setDescription("");
    setimage("");
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
      <header className="header">Manage Pages</header>

      <div
        style={{
          marginTop: "0rem",
          alignItems: "center",
        }}
      >
        {/* <Tabs
          // value={value}
          // onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="action tabs example"
          style={{ marginLeft: "-47rem", backgroundColor: "cornsilk" }}
        >
          <Tab label="Manage Page" />
        </Tabs> */}
        <div>
          <Button
            variant="contained"
            onClick={handleOpen}
            style={{
              position: "absolute",
              right: 0,
              marginRight: "4.4%",
              marginTop: "7px",
              width: "auto",
            }}
          >
            Add Page
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
                <h1 style={{ textAlign: "center" }}>Update Page</h1>
                <form onSubmit={updatedItemHandler}>
                  <Box style={{ marginTop: "20px", margin: "3rem" }}>
                    <TextField
                      fullWidth
                      label="Title"
                      name="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      autoFocus
                    />
                    {/* {!title && <p>Plz fill the Title</p> } */}
                    <TextField
                      fullWidth
                      label="Slug"
                      name="slug"
                      value={slug}
                      onChange={(e) => setslug(e.target.value)}
                      style={{ marginTop: "20px" }}
                      autoFocus
                    />

                    <input
                      type="file"
                      name="image"
                      id=""
                      onChange={(e) => setimage(e.target.files[0])}
                    />

                    {/* <Texteditor
                      setDescription={setDescription}
                      description={description}
                      update={update}
                    /> */}
                    <TextEditorManagepage
                      setDescription={setDescription}
                      description={description}
                      update={update}
                    />

                    {/* {!description && <p>Plz fill the description</p> } */}

                    <FormControl component="fieldset">
                      {/* <FormLabel component="legend">Gender</FormLabel>  */}
                      <RadioGroup
                        aria-label="select dropdown"
                        name="controlled-radio-buttons-group"
                        value={radioValue}
                        onChange={handleChange}
                      >
                        <FormControlLabel
                          value="Select ParentMenu"
                          control={<Radio />}
                          label="Select ParentMenu"
                        />
                        <FormControlLabel
                          value="Select Parent Service"
                          control={<Radio />}
                          label="Select Parent Service"
                        />
                      </RadioGroup>
                    </FormControl>

                    {radioValue === "Select ParentMenu" && (
                      <FormControl
                        sx={{
                          mt: 2,
                          minWidth: 340,
                          width: "-webkit-fill-available",
                        }}
                      >
                        <InputLabel id="demo-simple-select-helper-label">
                          Select ParentMenu
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          id="demo-simple-select-helper"
                          name="demo-simple-select-helper"
                          value={parentMenu}
                          label="Select ParentMenu"
                          onChange={(e) => {
                            setparentMenu(e.target.value);
                          }}
                        >
                          <MenuItem value="0">
                            <em>None</em>
                          </MenuItem>
                          {menuData.map((item, indexId) => (
                            <MenuItem value={item.id} key={indexId}>
                              {item.title}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}

                    {/* </div> */}

                    {radioValue === "Select Parent Service" && (
                      <FormControl
                        sx={{
                          mt: 2,
                          minWidth: 352,
                          width: "-webkit-fill-available",
                        }}
                      >
                        <InputLabel id="demo-simple-select-helper-label">
                          Select Parent Service
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          id="demo-simple-select-helper1"
                          name="demo-simple-select-helper1"
                          value={parentService}
                          label="Select Parent Service"
                          onChange={(e) => {
                            setParentService(e.target.value);
                          }}
                        >
                          <MenuItem value={0}>None</MenuItem>
                          {serviceData.map((service, indexId) => (
                            <MenuItem value={service.id} key={indexId}>
                              {service.title}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}

                    <div>
                      <div style={{ marginTop: "20px", marginLeft: "45rem" }}>
                        <Button
                          // type="submit"
                          style={{
                            backgroundColor: "blue",
                            color: "white",
                            // marginTop: "20px",
                            marginRight: "5px",
                          }}
                          onClick={() => {
                            setupdatedItemModal(false);
                            setRadioValue("");
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
                            // marginLeft: "4rem",
                          }}
                        >
                          Update-Page
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
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <h1 style={{ textAlign: "center", marginLeft: "0%" }}>
                Add Page
              </h1>
              <form onSubmit={submitHandler}>
                <Box style={{ marginTop: "20px", margin: "3rem" }}>
                  <TextField
                    fullWidth
                    label="Title"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    autoFocus
                  />
                  {/* {!title && <p>Plz fill the Title</p> } */}
                  <TextField
                    fullWidth
                    label="Slug"
                    name="slug"
                    value={slug}
                    onChange={(e) => setslug(e.target.value)}
                    style={{ marginTop: "20px" }}
                    autoFocus
                  />

                  <input
                    type="file"
                    name="image"
                    id=""
                    onChange={(e) => setimage(e.target.files[0])}
                  />
                  {/* <Texteditor setDescription={setDescription} /> */}
                  <TextEditorManagepage setDescription={setDescription} />

                  <FormControl component="fieldset">
                    {/* <FormLabel component="legend">Gender</FormLabel>  */}
                    <RadioGroup
                      aria-label="select dropdown"
                      name="controlled-radio-buttons-group"
                      value={radioValue}
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value="Select ParentMenu"
                        control={<Radio />}
                        label="Select ParentMenu"
                      />
                      <FormControlLabel
                        value="Select Parent Service"
                        control={<Radio />}
                        label="Select Parent Service"
                      />
                    </RadioGroup>
                  </FormControl>

                  {radioValue === "Select ParentMenu" && (
                    <FormControl
                      sx={{ mt: 2, width: "-webkit-fill-available" }}
                    >
                      <InputLabel id="demo-simple-select-helper-label">
                        Select ParentMenu
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper2"
                        name="demo-simple-select-helper2"
                        value={parentMenu}
                        label="Select ParentMenu"
                        onChange={(e) => {
                          setparentMenu(e.target.value);
                        }}
                      >
                        <MenuItem value="0">
                          <em>None</em>
                        </MenuItem>
                        {menuData.map((item, indexId) => (
                          <MenuItem value={item.id} key={indexId}>
                            {item.title}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                  {radioValue === "Select Parent Service" && (
                    <FormControl
                      sx={{ mt: 2, minWidth: "-webkit-fill-available" }}
                    >
                      <InputLabel id="demo-simple-select-helper-label">
                        Select Parent Service
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper3"
                        name="demo-simple-select-helper3"
                        value={parentService}
                        label="Select Parent Service"
                        onChange={(e) => {
                          setParentService(e.target.value);
                        }}
                      >
                        <MenuItem value={0}>None</MenuItem>
                        {serviceData.map((service, indexId) => (
                          <MenuItem value={service.id} key={indexId}>
                            {service.title}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}

                  {/* {!description && <p>Plz fill the description</p> } */}

                  {/* </div> */}

                  <div>
                    <div style={{ marginTop: "20px", marginLeft: "46.69rem" }}>
                      <Button
                        // type="submit"
                        style={{
                          backgroundColor: "blue",
                          color: "white",
                          // marginTop: "20px",
                          marginRight: "5px",
                        }}
                        onClick={() => {
                          setOpen(false);
                          setRadioValue("");
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
                          // marginLeft: "15rem",
                        }}
                      >
                        Add-Page
                      </Button>
                    </div>
                  </div>
                </Box>
              </form>
            </Typography>
          </div>
        </Box>
      </Modal>

      <div>
        <Dialog
          open={deletePagePopup}
          // onClose={closeDeletePopup}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure want to delete this page ?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This page will delete permanently
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setdeletePagePopup(false)}>Cancel</Button>
            <Button onClick={() => deleteHandler(deletePage.id)} autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      {/* {data.map((curItem, i) => <p>{ curItem }</p> )} */}
      {
        data.length > 0 ? (
          <div className="main">
            <Paper
              sx={{
                // top: "4rem",
                height: "28rem",
                // width: "80.4%",
                padding: "3rem",
                overflow: "hidden",
                // padding: "3.5rem",
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

                              <TableCell>{row.slug}</TableCell>
                              <TableCell>{row.image}</TableCell>
                              <TableCell>{row.description}</TableCell>
                              <TableCell align="right">
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
                                    setDeletePage(row);
                                    setdeletePagePopup(true);
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
        ) : (
          <>
            <h1>No Page Found!!!</h1> <p>Plz Page Menu..!!</p>
          </>
        )
      }

    </>
  );
};
