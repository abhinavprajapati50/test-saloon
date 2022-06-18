const {
  manageMenu,
  allMenu,
  deleteMenu,
  updateManu,
  parent_ChildMenu,
} = require("../Controller/adminMenu");
const {
  adminPages,
  allPages,
  deletePage,
  updatePage,
} = require("../Controller/adminPages");
const { manageService, updateService, deleteService, allService } = require("../Controller/adminServices");
const { createAppointment, allAppointments, deleteAppointment, updateAppointment, aproovedAppointment, rejectedAppointment } = require("../Controller/appointmentPage");
const { signUpRoute, signin } = require("../Controller/userController");
const upload = require("../imageuploader");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("the home page");
});

// ------USER
router.post("/signup", signUpRoute);
router.post("/signin", signin);

// -----------------------------MENU

// --(I) Manage Menu
router.post("/admin/managemenu", manageMenu);
router.get("/admin/allmenu", allMenu);
router.put("/admin/allmenu/:id", updateManu);
router.put("/admin/allmenu/delete/:id", deleteMenu);   // NOTE:- update the data like id delete then char_delete flag 1

// --(II) Manage Pages
router.post("/admin/allpages",upload.single("image") ,adminPages);
router.get("/admin/allpages" ,allPages);
router.put("/admin/allpages/:id",upload.single("image"), updatePage);
router.put("/admin/allpages/delete/:id", deletePage);     // NOTE:- update the data like id delete then char_delete flag 1
// router.put('/admin/allpages/:id', updatePage)

// -------(III) Manage Services
router.post("/admin/allservice", upload.single("imageUrl") ,manageService);
router.get("/admin/allservice", allService);
router.put("/admin/allservice/:id",upload.single("imageUrl"), updateService);
router.put("/admin/allservice/delete/:id", deleteService);

// -------(IV) Manage Appontments
router.post("/admin/appontment" ,createAppointment);
router.get("/admin/appontment" ,allAppointments);
router.put("/admin/appontment/aprooved/:id" ,aproovedAppointment);
router.put("/admin/appontment/reject/:id" ,rejectedAppointment);

module.exports = router;
