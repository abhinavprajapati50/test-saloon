const Manage_Service = require("../Model/manage_services");

exports.manageService = async (req, res) => {
  // console.log("manage service here");
  const { title, short_description, long_description, parent_id, chr_delete } = req.body;
  // let imageUrl = req.file.originalname;
  let imageUrl;
  if (!req.file) {
    return res
      .status(401)
      .json({ status: false, message: "Plz Select the Image!!!" });
  }
  console.log("------------________________", req.file );
  imageUrl = req.file.filename;
  //   console.log("req.file in post api -->>", req.file);
  if (!title || !short_description || !long_description) {
    res.status(500).json({
      status: false,
      message: "Something went wrong!!!.  All Field Required* ",
      data: error || error.message,
    });
  }
  // const error = validationResult(req);
  // if (!error.isEmpty()) {
  //   const error = new Error("Validation failed, Please enter correct data");
  //   error.statusCode = 422;
  //   throw error;
  // }

  try {
    const result_Serivice = await Manage_Service.create({
      title,
      short_description,
      long_description,
      parent_id,
      imageUrl,
      chr_delete
    });
    console.log("--------------------------",result_Serivice);
    res.status(200).json({
      status: true,
      message: "Added Service Successfully",
      data: result_Serivice,
    });
  } catch (error) {
    console.log("-----error", error);
    res.status(500).json({
      status: false,
      message: "Something went wrong to Add the Services",
      data: error || error.message,
    });
  }
};


exports.allService = async (req, res, next) => {
    try {
      const allServices = await Manage_Service.findAll({ where: { chr_delete: 0 } });
      console.log(allServices);
      return res.status(201).json({
        status: true,
        message: "Get ALl Services Fetched Successfully",
        data: allServices,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: false,
        message: "Service could't be fetched",
        data: error,
      });
    }
  };
// title, short_description, long_description,  imageUrl });
exports.updateService = async (req, res) => {

  const { title, short_description, long_description } = req.body;
  let imageUrl = req.file;
  try {
    if (req.file) {
      const menu_Services_Update = await Manage_Service.update(
        {
          title: title,
          short_description: short_description,
          imageUrl: imageUrl.filename,
          long_description: long_description,
        },
        { where: { id: req.params.id } }
        );
        
        res.status(200).json({
          status: true,
          message: "Service Successfully updated",
          data: { title, short_description, long_description, imageUrl },
        });
    } else {
      const menu_Services_Update = await Manage_Service.update(
        {
          title: title,
          short_description: short_description,
          long_description: long_description,
        },
        { where: { id: req.params.id } }
        );
        // let resMessage = "Successfully updated.";
        
        res.status(200).json({
          status: true,
          message: "Service Successfully updated",
          data: { title, short_description, long_description, imageUrl },
        });
      }
    // return  result;
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ status: false, message: " Page is not  Updated", data: error });
  }
};

exports.deleteService = async (req, res, next) => {
  try {
    let id = req.params.id;
    const deleteService = await Manage_Service.update(
      { chr_delete: 1 },
      { where: { id: id } }
    );

    return res.status(200).json({
      status: true,
      message: " Service Deleted successfully ",
      data: deleteService,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: " Service shouldn't be  delete ",
      data: error,
    });
  }
};
