const MenuPages = require("../Model/managePages");
const Manage_Appointment = require("../Model/manage_appointment");
const navbarMenu = require("../Model/navBarMenu");
//  id, first_name, last_name, email, mobile, service_type, date, time, remark

exports.createAppointment = async (req, res, next) => {
  //   const { title, slug, description, chr_delete } = req.body;
  const {
    first_name,
    last_name,
    email,
    mobile,
    service_type,
    date,
    time,
    remark,
    chr_delete
  } = req.body;

  if (
    !first_name ||
    !last_name ||
    !email ||
    !mobile ||
    !service_type ||
    !date ||
    !time ||
    !remark
    ) {
      return res
      .status(200)
      .json({ type: "error", status: false, message: "All field required" });
    }
    let mobileRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
  if(!mobileRegex.test(mobile)){
    return res
    .status(200)
    .json({ type: "error", status: false, message: "Plz enter valid mobile number must be 10 digit " });
    }
  try {
    const dateFindOne = await Manage_Appointment.findOne({
      where: { date: date, time: time },
    });

    if (dateFindOne) {
      return res.status(200).json({
        type: "conflict",
        status: false,
        message: "Please chooose another date or time !!",
        // data: error,
      });
    } else {
      // console.log("==========",phone);
      const result_Appointment = await Manage_Appointment.create({
        first_name,
        last_name,
        email,
        mobile,
        service_type,
        date,
        time,
        remark,
        chr_delete
      });
      console.log(result_Appointment);
      // --
      let resMessage = "Successfully add Appointment.";
      // --
      res.status(200).json({
        type: "success",
        status: true,
        message: resMessage,
        data: result_Appointment,
      });
    }
  } catch (error) {
    console.log("---------error", error);
     res.status(500).json({
      type: "error",
      status: false,
      message: "Appointment is not Created",
      data: error,
    });
  }
};

exports.allAppointments = async (req, res, next) => {
  try {
    const allData = await Manage_Appointment.findAll({
      where: { chr_delete: 0 },
    });


     res.status(201).json({
      status: true,
      message: "Get ALl Appointments Fetched Successfully",
      data: allData,
    });
  } catch (error) {
     res.status(500).json({
      status: false,
      message: "Pages could't be fetched",
      data: error,
    });
  }
};

exports.aproovedAppointment = async (req, res, next) => {
  try {
    let id = req.params.id;
    const dltUptData = await Manage_Appointment.update(
      { status: "1" },
      { where: { id: id } }
    );

     res.status(200).json({
      status: true,
      message: " Aprooved successfully ",
      data: dltUptData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Somethings wents wrong",
      data: error,
    });
  }
};

exports.rejectedAppointment = async (req, res) => {
  try {
    let id = req.params.id;

    const menuPageStatus = await Manage_Appointment.update(
      {
        status: "0",
      },
      { where: { id: id } }
    );
    let resMessage = "Successfully Rejected.";

     res.status(200).json({
      status: true,
      message: resMessage,
      data: menuPageStatus,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      status: false,
      message: " Somethings wents wrong",
      data: error,
    });
  }
};

// =================================
// =================================
// =================================

// export const menuPages = async (req, res, next) => {
//   try {

//   } catch (error) {
//     console.log();
//     res.status(500).json({ error: error });

//   }
// }

// let query =  `UPDATE navbars m JOIN pages p  SET m.page_slug=p.title {where:{m.id:p.id} };`
// let menuQuery = `UPDATE ${navbarMenu} m JOIN ${MenuPages} p  SET ${m.page_slug}=${p.title} {where:{{m.id:p.id}} };`
