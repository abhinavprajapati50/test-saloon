// ================================MANAGE PAGES
// ================================MANAGE PAGES

// import { useEffect, useState } from "react";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import Modal from "@mui/material/Modal";
// import { Tab, TextField } from "@mui/material";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";
// import { Texteditor } from "../../text-edit/texteditor";
// import { IconButton } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
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

// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";

// import InputLabel from "@mui/material/InputLabel";
// // import FormControl from "@mui/material/FormControl";
// import MenuItem from "@mui/material/MenuItem";
// import Select from "@mui/material/Select";
// import { TextEditor_Manage_page } from "../../text-edit/Text_Editor_Manage_page";
// import Tabs from "@mui/material/Tabs";

// import Radio from "@mui/material/Radio";
// import RadioGroup from "@mui/material/RadioGroup";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import FormControl from "@mui/material/FormControl";
// import FormLabel from "@mui/material/FormLabel";

// // import { Button } from "@mui/material";

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
// const MenuModelStyle = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 1050,
//   height: 500,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   overflowY: "auto",
//   p: 1,
//   boxShadow: 24,
// };

// export const ManagePages = ({ set }) => {
//   const [open, setOpen] = useState(false);
//   const [updatedItemModal, setupdatedItemModal] = useState(false);

//   const [title, setTitle] = useState("");
//   const [slug, setslug] = useState("");
//   const [image, setimage] = useState("");
//   const [description, setDescription] = useState([]);
//   const [chr_delete, setchr_delete] = useState(0);
//   const [apiData, setapiData] = useState([]);
//   const [updateState, setupdateState] = useState("");
//   const [update, setupdate] = useState(false);
//   const [menuData, setmenuData] = useState([]);
//   const [parentMenu, setparentMenu] = useState(0);
//   const [serviceData, setServiceData] = useState([]);
//   const [parentService, setParentService] = useState(0);
//   // const confirm = useConfirm();

//   //radio button selection
//   const [radioValue, setRadioValue] = useState("");

//   // console.log("parentService --->>", parentService);

//   const [deletePage, setDeletePage] = useState({});
//   const [deletePagePopup, setdeletePagePopup] = useState(false);
//   // console.log("delete page -->>", deletePage);

//   const apiFunc = async () => {
//     try {
//       const result = await axios.get("http://localhost:5000/admin/allpages");
//       setapiData(result.data.data);
//       return result;
//     } catch (error) {
//       toast.error(error.message);
//       return error;
//     }
//   };
//   useEffect(() => {
//     apiFunc();
//   }, [title, slug, image, description]);

//   useEffect(async () => {
//     let allMenu = await axios
//       // .get("http://localhost:5000/admin/allmenu")
//       .get("http://localhost:5000/admin/allmenu");
//     setmenuData(allMenu.data.data);
//     return allMenu;
//     // .then((result) => setdata(result.data.allData))
//     // .catch((errror) => console.log(errror));
//   }, []);

//   useEffect(async () => {
//     let allservice = await axios.get("http://localhost:5000/admin/allservice");
//     setServiceData(allservice.data.data);
//     return allservice;
//   }, []);

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => {
//     setOpen(false);
//     setRadioValue("");
//   };

//   const openUpdateModalHandler = () => {
//     setOpen(false);
//     setupdatedItemModal(true);
//   };
//   const closeUpdateModalHandler = () => {
//     clearForm();
//     setupdatedItemModal(false);
//     setRadioValue("");
//   };

//   //radio button selection
//   const handleChange = (event) => {
//     console.log("event.target.value radio ---->>", event.target.value);
//     setRadioValue(event.target.value);
//   };

//   const deleteHandler = async (id) => {
//     console.log("delete id ->", id);
//     setdeletePagePopup(false);
//     const updatedDetails = apiData.find((curData) => curData.id === id);
//     try {
//       console.log(updatedDetails);
//       const result = await axios.put(
//         `http://localhost:5000/admin/allpages/delete/${updatedDetails.id}`
//       );
//       setchr_delete(1);
//       apiFunc();
//       clearForm();
//       toast.success("Page sucessfully Deleted");
//       return result.data;
//     } catch (error) {
//       console.log("error: " + error);
//     }
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     setupdatedItemModal(false);
//     setupdate(false);
//     if (!title || !slug || !image || !description) {
//       toast.error("Plz Fill all the field");
//       return;
//     }
//     try {
//       const formData = new FormData();
//       // // chr_delete
//       // console.log("the data", image);
//       formData.append("title", title);
//       formData.append("slug", slug);
//       formData.append("image", image);
//       formData.append("description", description);
//       formData.append(`chr_delete`, chr_delete);
//       formData.append(`parentMenu`, parentMenu);
//       formData.append(`parentService`, parentService);
//       const result = await axios.post(
//         "http://localhost:5000/admin/allpages",
//         formData
//       );

//       toast.success(result.data.message);
//       // setOpen(false);
//       setTitle("");
//       setslug("");
//       setParentService(0);
//       apiFunc();
//       handleClose();
//       // openUpdateModalHandler()
//       return result.data;
//     } catch (error) {
//       toast.error(error);
//       return console.log("error: " + error);
//     }
//   };

//   const updatedItemHandler = async (e) => {
//     e.preventDefault();
//     if (!title || !slug || !image || !description) {
//       toast.error("Plz Fill the all the field");
//       return;
//     }

//     try {
//       const formData = new FormData();

//       formData.append("title", title);
//       formData.append("slug", slug);
//       formData.append("image", image);
//       formData.append("description", description);
//       formData.append(`parentMenu`, parentMenu);
//       formData.append(`parentService`, parentService);
//       console.log(updateState);
//       const result = await axios.put(
//         `http://localhost:5000/admin/allpages/${updateState}`,
//         formData
//       );
//       toast.success("Page sucessfully Updated");
//       setTitle("");
//       closeUpdateModalHandler();
//       // open(false);
//       console.log(result.data.data);
//       apiFunc();
//       clearForm();
//       return result.data.data;
//     } catch (error) {
//       console.log(error);
//       toast.error("Invalid Credentials");
//       console.log("error: " + error);
//     }
//   };

//   const editHandler = (id) => {
//     setupdate(true);
//     setupdatedItemModal(true);
//     apiFunc();
//     const updatedDetails = apiData.find((curData) => curData.id === id);

//     console.log("updatedDetails===-==-=-=-->", updatedDetails);
//     setTitle(updatedDetails.title);
//     setslug(updatedDetails.slug);
//     setimage(updatedDetails.image);
//     setDescription(updatedDetails.description);
//     setupdateState(updatedDetails.id);
//     console.log("radio value -->>", radioValue);

//     // setapiData(updatedData)
//     // const formData = new FormData();
//     // formData.append("image",apiData.image);
//     // formData.append("slug", slug);
//     // formData.append("description", description);

//     // axios
//     //   .put(`http://localhost:5000/admin/allpages/${id}`)
//     //   .then((response) => response);
//   };

//   const clearForm = (result) => {
//     setTitle("");
//     setslug("");
//     setDescription("");
//     setimage("");
//   };

//   return (
//     <>
//       <div
//         style={{
//           marginTop: "0rem",
//           alignItems: "center",
//         }}
//       >
//         {/* <Tabs
//           // value={value}
//           // onChange={handleChange}
//           indicatorColor="primary"
//           textColor="primary"
//           variant="fullWidth"
//           aria-label="action tabs example"
//           style={{ marginLeft: "-47rem", backgroundColor: "cornsilk" }}
//         >
//           <Tab label="Manage Page" />
//         </Tabs> */}
//         <div>
//           <Button
//             variant="contained"
//             onClick={handleOpen}
//             style={{
//               position: "absolute",
//               right: 0,
//               marginRight: "22.5%",
//               marginTop: "75px",
//               width: "auto",
//             }}
//           >
//             Add Page
//           </Button>
//         </div>
//       </div>

//       {/* ------------UPdated Item */}
//       {update && (
//         <Modal
//           open={updatedItemModal}
//           onClose={openUpdateModalHandler}
//           // setupdatedItemModal(false);
//           aria-labelledby="modal-modal-title"
//           aria-describedby="modal-modal-description"
//         >
//           <Box sx={MenuModelStyle}>
//             <div>
//               <IconButton
//                 style={{
//                   position: "absolute",
//                   top: 0,
//                   right: 0,
//                   marginTop: "1px",
//                   marginRight: "5px",
//                 }}
//                 color="primary"
//                 aria-label="edit_record"
//                 component="span"
//                 onClick={closeUpdateModalHandler}
//               >
//                 <CloseIcon />
//               </IconButton>
//               {/* <h1 style={{ textAlign: "center" }}>Update-Pages</h1> */}
//               <Typography id="modal-modal-title" variant="h6" component="h2">
//                 <h1 style={{ textAlign: "center" }}>Update Page</h1>
//                 <form onSubmit={updatedItemHandler}>
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
//                       onChange={(e) => setimage(e.target.files[0])}
//                     />

//                     {/* <Texteditor
//                       setDescription={setDescription}
//                       description={description}
//                       update={update}
//                     /> */}
//                     <TextEditor_Manage_page
//                       setDescription={setDescription}
//                       description={description}
//                       update={update}
//                     />

//                     {/* {!description && <p>Plz fill the description</p> } */}

//                     <FormControl component="fieldset">
//                       {/* <FormLabel component="legend">Gender</FormLabel>  */}
//                       <RadioGroup
//                         aria-label="select dropdown"
//                         name="controlled-radio-buttons-group"
//                         value={radioValue}
//                         onChange={handleChange}
//                       >
//                         <FormControlLabel
//                           value="Select ParentMenu"
//                           control={<Radio />}
//                           label="Select ParentMenu"
//                         />
//                         <FormControlLabel
//                           value="Select Parent Service"
//                           control={<Radio />}
//                           label="Select Parent Service"
//                         />
//                       </RadioGroup>
//                     </FormControl>

//                     {radioValue === "Select ParentMenu" && (
//                     <FormControl
//                       sx={{
//                         mt: 2,
//                         minWidth: 340,
//                         width: "-webkit-fill-available",
//                       }}
//                     >
//                       <InputLabel id="demo-simple-select-helper-label">
//                         Select ParentMenu
//                       </InputLabel>
//                       <Select
//                         labelId="demo-simple-select-helper-label"
//                         id="demo-simple-select-helper"
//                         value={parentMenu}
//                         label="Select ParentMenu"
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
//                     )}

//                     {/* </div> */}

//                     {radioValue === "Select Parent Service" && (
//                     <FormControl
//                       sx={{
//                         mt: 2,
//                         minWidth: 352,
//                         width: "-webkit-fill-available",
//                       }}
//                     >
//                       <InputLabel id="demo-simple-select-helper-label">
//                         Select Parent Service
//                       </InputLabel>
//                       <Select
//                         labelId="demo-simple-select-helper-label"
//                         id="demo-simple-select-helper"
//                         value={parentService}
//                         label="Select Parent Service"
//                         onChange={(e) => {
//                           setParentService(e.target.value);
//                         }}
//                       >
//                         <MenuItem value={0}>None</MenuItem>
//                         {serviceData.map((service) => (
//                           <MenuItem value={service.id}>
//                             {service.title}
//                           </MenuItem>
//                         ))}
//                       </Select>
//                     </FormControl>
//                     )}

//                     <div>
//                       <div style={{ marginTop: "20px", marginLeft: "45rem" }}>
//                         <Button
//                           // type="submit"
//                           style={{
//                             backgroundColor: "blue",
//                             color: "white",
//                             // marginTop: "20px",
//                             marginRight: "5px",
//                           }}
//                           onClick={() => {setupdatedItemModal(false)
//                           setRadioValue("")}}
//                         >
//                           Cancel
//                         </Button>
//                         <Button
//                           type="submit"
//                           style={{
//                             backgroundColor: "blue",
//                             color: "white",
//                             // marginTop: "20px",
//                             // marginLeft: "4rem",
//                           }}
//                         >
//                           Update-Page
//                         </Button>
//                       </div>
//                     </div>
//                   </Box>
//                 </form>
//               </Typography>
//             </div>
//           </Box>
//         </Modal>
//       )}

//       <Modal
//         open={open}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={MenuModelStyle}>
//           <div>
//             <IconButton
//               style={{
//                 position: "absolute",
//                 top: 0,
//                 right: 0,
//                 marginTop: "1px",
//                 marginRight: "5px",
//               }}
//               color="primary"
//               aria-label="edit_record"
//               component="span"
//               onClick={handleClose}
//             >
//               <CloseIcon />
//             </IconButton>
//             {/* <h1 style={{ textAlign: "center" }}>Update-Pages</h1> */}
//             <Typography id="modal-modal-title" variant="h6" component="h2">
//               <h1 style={{ textAlign: "center", marginLeft: "0%" }}>
//                 Add Page
//               </h1>
//               <form onSubmit={submitHandler}>
//                 <Box style={{ marginTop: "20px", margin: "3rem" }}>
//                   <TextField
//                     fullWidth
//                     label="Title"
//                     name="title"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                     autoFocus
//                   />
//                   {/* {!title && <p>Plz fill the Title</p> } */}
//                   <TextField
//                     fullWidth
//                     label="Slug"
//                     name="slug"
//                     value={slug}
//                     onChange={(e) => setslug(e.target.value)}
//                     style={{ marginTop: "20px" }}
//                     autoFocus
//                   />

//                   <input
//                     type="file"
//                     name="image"
//                     id=""
//                     onChange={(e) => setimage(e.target.files[0])}
//                   />
//                   {/* <Texteditor setDescription={setDescription} /> */}
//                   <TextEditor_Manage_page setDescription={setDescription} />

//                   <FormControl component="fieldset">
//                     {/* <FormLabel component="legend">Gender</FormLabel>  */}
//                     <RadioGroup
//                       aria-label="select dropdown"
//                       name="controlled-radio-buttons-group"
//                       value={radioValue}
//                       onChange={handleChange}
//                     >
//                       <FormControlLabel
//                         value="Select ParentMenu"
//                         control={<Radio />}
//                         label="Select ParentMenu"
//                       />
//                       <FormControlLabel
//                         value="Select Parent Service"
//                         control={<Radio />}
//                         label="Select Parent Service"
//                       />
//                     </RadioGroup>
//                   </FormControl>

//                   {radioValue === "Select ParentMenu" && (
//                     <FormControl
//                       sx={{ mt: 2, width: "-webkit-fill-available" }}
//                     >
//                       <InputLabel id="demo-simple-select-helper-label">
//                         Select ParentMenu
//                       </InputLabel>
//                       <Select
//                         labelId="demo-simple-select-helper-label"
//                         id="demo-simple-select-helper"
//                         value={parentMenu}
//                         label="Select ParentMenu"
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
//                   )}
//                   {radioValue === "Select Parent Service" && (
//                     <FormControl
//                       sx={{ mt: 2, minWidth: "-webkit-fill-available" }}
//                     >
//                       <InputLabel id="demo-simple-select-helper-label">
//                         Select Parent Service
//                       </InputLabel>
//                       <Select
//                         labelId="demo-simple-select-helper-label"
//                         id="demo-simple-select-helper"
//                         value={parentService}
//                         label="Select Parent Service"
//                         onChange={(e) => {
//                           setParentService(e.target.value);
//                         }}
//                       >
//                         <MenuItem value={0}>None</MenuItem>
//                         {serviceData.map((service) => (
//                           <MenuItem value={service.id}>
//                             {service.title}
//                           </MenuItem>
//                         ))}
//                       </Select>
//                     </FormControl>
//                   )}

//                   {/* {!description && <p>Plz fill the description</p> } */}

//                   {/* </div> */}

//                   <div>
//                     <div style={{ marginTop: "20px", marginLeft: "46.69rem" }}>
//                       <Button
//                         // type="submit"
//                         style={{
//                           backgroundColor: "blue",
//                           color: "white",
//                           // marginTop: "20px",
//                           marginRight: "5px",
//                         }}
//                         onClick={() => {setOpen(false)
//                         setRadioValue("")}}
//                       >
//                         Cancel
//                       </Button>
//                       <Button
//                         type="submit"
//                         style={{
//                           backgroundColor: "blue",
//                           color: "white",
//                           // marginTop: "20px",
//                           // marginLeft: "15rem",
//                         }}
//                       >
//                         Add-Page
//                       </Button>
//                     </div>
//                   </div>
//                 </Box>
//               </form>
//             </Typography>
//           </div>
//         </Box>
//       </Modal>

//       <div>
//         <Dialog
//           open={deletePagePopup}
//           // onClose={closeDeletePopup}
//           aria-labelledby="alert-dialog-title"
//           aria-describedby="alert-dialog-description"
//         >
//           <DialogTitle id="alert-dialog-title">
//             {"Are you sure want to delete this page ?"}
//           </DialogTitle>
//           <DialogContent>
//             <DialogContentText id="alert-dialog-description">
//               This page will delete permanently
//             </DialogContentText>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setdeletePagePopup(false)}>Cancel</Button>
//             <Button onClick={() => deleteHandler(deletePage.id)} autoFocus>
//               OK
//             </Button>
//           </DialogActions>
//         </Dialog>
//       </div>

//       {/* {apiData.map((curItem, i) => <p>{ curItem }</p> )} */}
//       <>
//         <div style={{ paddingBottom: "0rem" }}>
//           <div style={style}>
//             <TableContainer
//               component={Paper}
//               style={{ overflowY: "auto", width: "100%", minHeight: "3rem" }}
//             >
//               <Table sx={{ maxWidth: 710 }} aria-label="customized table">
//                 <TableHead>
//                   <TableRow>
//                     <StyledTableCell>Title</StyledTableCell>
//                     <StyledTableCell>Slug</StyledTableCell>
//                     <StyledTableCell>Image</StyledTableCell>
//                     <StyledTableCell>Description</StyledTableCell>
//                     <StyledTableCell>Action</StyledTableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {apiData.map((row) => (
//                     <StyledTableRow key={row.id}>
//                       <StyledTableCell align="left">
//                         {row.title}
//                       </StyledTableCell>
//                       <StyledTableCell align="left">{row.slug}</StyledTableCell>
//                       <StyledTableCell align="left">
//                         {row.image}
//                       </StyledTableCell>
//                       <StyledTableCell align="left">
//                         {row.description}
//                       </StyledTableCell>
//                       <EditIcon
//                         style={{
//                           color: "blue",
//                           marginRight: "20px",
//                           cursor: "pointer",
//                         }}
//                         onClick={() => editHandler(row.id)}
//                       />
//                       <DeleteIcon
//                         style={{ color: "red", cursor: "pointer" }}
//                         onClick={() => {
//                           setDeletePage(row);
//                           setdeletePagePopup(true);
//                         }}
//                       />
//                     </StyledTableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </div>
//         </div>
//       </>
//     </>
//   );
// };

// ================================MANAGE PAGES
// ================================MANAGE PAGES
// ================================MANAGE PAGES

// import React, { useEffect, useState } from "react";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import axios from "axios";
// import { useNavigate } from "react-router";
// import Button from "@mui/material/Button";
// import Menu from "@mui/material/Menu";
// // import MenuItem from "@mui/material/MenuItem";
// import Dropdown from '@material-tailwind/react/Dropdown';
// import Icon from '@material-tailwind/react/Icon';

// import DropdownItem from '@material-tailwind/react/DropdownItem';

// import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

// import Fade from "@mui/material/Fade";
// import { Link } from "react-router-dom";
// import { IconButton, MenuItem } from "@mui/material";

// const pages = ['Products', 'Pricing', 'Blog'];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout']

// export const NavBar_Frontend = ({ setIsLoggedIn, isLoggedIn }) => {
//   const [menuData, setmenuData] = useState([]);
//   const [menuParentId, setmenuParentId] = useState("");
//   const [anchorEl, setAnchorEl] = useState(null);
//   const open = anchorEl;
//   const navigate = useNavigate();

//   const [anchorElNav, setAnchorElNav] = useState(null);
//   const [anchorElUser, setAnchorElUser] = useState(null);

//   const handleOpenNavMenu = (event) => {
//     setAnchorElNav(event.currentTarget);
//   };

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };

//   useEffect(async () => {
//     let allMenu = await axios.get("http://localhost:5000/admin/allmenu");
//     setmenuData(allMenu.data.data);
//     return allMenu;
//   }, []);

//   const subMenuDataa = (SelectedMenu) => {
//     // console.log(menuData.id)
//     return menuData.filter((curdata) =>
//       curdata.parent_Menu === SelectedMenu.id
//         ? setmenuParentId(curdata.title)
//         : setmenuParentId("")
//     );
//     // ---- array
//     console.log(menuParentId);
//   };

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <>
//       <AppBar position="static">
//       <Container maxWidth="xl">
//         <Toolbar disableGutters>
//           <Typography
//             variant="h6"
//             noWrap
//             component="div"
//             sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
//           >
//             LOGO
//           </Typography>

//           <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
//             <IconButton
//               size="large"
//               aria-label="account of current user"
//               aria-controls="menu-appbar"
//               aria-haspopup="true"
//               onClick={handleOpenNavMenu}
//               color="inherit"
//             >
//             </IconButton>
//             <Menu
//               id="menu-appbar"
//               anchorEl={anchorElNav}
//               anchorOrigin={{
//                 vertical: 'bottom',
//                 horizontal: 'left',
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'left',
//               }}
//               open={Boolean(anchorElNav)}
//               onClose={handleCloseNavMenu}
//               sx={{
//                 display: { xs: 'block', md: 'none' },
//               }}
//             >
//               {pages.map((page) => (
//                 <MenuItem key={page} onClick={handleCloseNavMenu}>
//                   <Typography textAlign="center">{page}</Typography>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>
//           <Typography
//             variant="h6"
//             noWrap
//             component="div"
//             sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
//           >
//             LOGO
//           </Typography>
//           <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
//             {menuData.map((menu) => (
//               <Button
//                 key={menu.id}
//                 onClick={handleCloseNavMenu}
//                 sx={{ my: 2, color: 'white', display: 'block' }}
//               >
//                 {menu}
//               </Button>
//             ))}
//           </Box>

//           </Toolbar>
//         </Container>
//       </AppBar>
//     </>
//   );
// };

//             // <Button
//             //   sx={{
//             //     flexGrow: 1,
//             //     display: { xs: "none", md: "flex", color: "white" },
//             //     // onClick={navigate}
//             //   }}
//             //   onClick={() => navigate("/login", { return: false })}
//             // >
//             //   Login
//             // </Button>

// ----------------------------------PARNT AND SUBMENU`

import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import axios from "axios";
import { useNavigate } from "react-router";
// import { NavBar_Frontend } from "./NavBar-Frontend";

const pages = ["Products", "Pricing", "Blog"];
// const settings = ["Profile", "Account", "Dashboard", "Logout"];

export const Home = ({ setIsLoggedIn, isLoggedIn }) => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [menuData, setmenuData] = useState([]);
  const [childMenu, setchildMenu] = useState([]);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [subMenu, setsubMenu] = useState(false);

  const navigate = useNavigate();

  const handleChooseSubMenu = (id) => {
    // console.log(id);
    setsubMenu(true);
    const childMenuData = menuData.filter((curMenu) =>
      curMenu.parent_Menu === id ? curMenu.title : console.log("null")
    );
    setchildMenu(childMenuData);
    setAnchorElNav(null);
  };

  console.log(childMenu);

  useEffect(async () => {
    let allMenu = await axios.get("http://localhost:5000/admin/allmenu");
    setmenuData(allMenu.data.data);
    return allMenu;
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  return (
    <>
      {/* <NavBar_Frontend setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}  />  */}
      <h1 style={{ alignItems: "center" }}>WELCOME HOME PAGE FRONTEND</h1>

      <>
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
                    {menuData.map((menu) =>
                      menu.parent_Menu === 0 ? (
                        <Button
                          key={menu.id}
                          variant="contained"
                          {...bindTrigger(popupState)}
                          // onMouseOver={() => handleChooseSubMenu(menu.id)}
                        >
                          {menu.title}
                        </Button>
                      ) : null
                    )}
                    <div>
                      <Menu {...bindMenu(popupState)}>
                        {childMenu.map((curMenu) => (
                          <MenuItem onClick={popupState.close}>
                            <>
                              <Button>{curMenu.title}</Button>
                            </>
                          </MenuItem>
                        ))}
                      </Menu>
                    </div>
                  </>
                )}
              </PopupState>
            </Toolbar>
          </Container>
        </AppBar>
        {childMenu.map((curMenu) => (
          <Button>{curMenu.title}</Button>
        ))}
      </>
    </>
  );
};
