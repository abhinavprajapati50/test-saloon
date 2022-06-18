const MenuPages = require("../Model/managePages");
const navbarMenu = require("../Model/navBarMenu");
const Manage_Service = require("../Model/manage_services");

// UPDATE navbars m JOIN pages p on m.id=p.id SET m.page_slug=p.title;

exports.adminPages = async (req, res, next) => {
  console.log("----------------------------------------------------------------------file", req.file);
  const { title, slug, description, chr_delete } = req.body;

  let image;
  if (!req.file) {
    return res
      .status(401)
      .json({ status: false, message: "Plz Select the Image!!!" });
  }
  image = req.file.originalname;

console.log(image);
  if (!title || !slug || !description) {
    return res
      .status(400)
      .json({ status: false, message: "All field required" });
  }
  try {
    const result_menu = await MenuPages.create({
      title,
      slug,
      image,
      description,
      chr_delete,
    });
console.log( "))))))))))))))))))))))))",result_menu);
    // --
    let resMessage = "Successfully updated.";
    if (result_menu) {
      try {
        const slugUpdateStatus = await navbarMenu.update(
          { page_slug: req.body.slug },
          { where: { id: req.body.parentMenu } }
        );

        // console.log(req.body.slug);
        // console.log(req.body.parentMenu);
        if (!slugUpdateStatus) {
          resMessage = "There is some technical issue while updating page.";
        }
      } catch (err) {
        resMessage = "Menu not updated.";
      }
    }

    //for select parent service
    if (result_menu) {
      try {
        const slugUpdateStatus = await Manage_Service.update(
          { page_slug: req.body.slug },
          { where: { id: req.body.parentService } }
        );

        // console.log("req.body.slug ---->>>", req.body.slug);
        if (!slugUpdateStatus) {
          resMessage = "There is some technical issue while updating page.";
        }
      } catch (err) {
        resMessage = "Menu not updated.";
      }
    }

    // --
    res.status(200).json({
      status: true,
      message: resMessage,
      data: { title, slug, image, description },
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Page is not Created",
      data: error,
    });
  }
};

exports.allPages = async (req, res, next) => {
  try {
    const allData = await MenuPages.findAll({ where: { chr_delete: 0 } });
    // console.log(")))))))))))))))))))))))))))))))))))))))))))))", allData);
    return res.status(201).json({
      status: true,
      message: "Get ALl Pages Fetched Successfully",
      data: allData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "Pages could't be fetched",
      data: error,
    });
  }
};

exports.deletePage = async (req, res, next) => {
  try {
    let id = req.params.id;
    const dltUptData = await MenuPages.update(
      { chr_delete: 1 },
      { where: { id: id } }
    );

    return res.status(200).json({
      status: true,
      message: " Deleted successfully ",
      data: dltUptData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: " Page shouldn't be  delete ",
      data: error,
    });
  }
};

exports.updatePage = async (req, res) => {
  const { title, slug, description } = req.body;


  let image = req.file;
  try {
    let id = req.params.id;
    if (req.file) {
      const menuPageStatus = await MenuPages.update(
        {
          title: title,
          slug: slug,
          image: image.originalname,
          description: description,
        },
        { where: { id: id } }
      );
      let resMessage = "Successfully updated.";
      if (menuPageStatus) {
        try {
          const slugUpdateStatus = await navbarMenu.update(
            { page_slug: req.body.slug },
            { where: { id: req.body.parentMenu } }
          );

          if (!slugUpdateStatus) {
            resMessage = "There is some technical issue while updating page.";
          }
        } catch (err) {
          resMessage = "Menu not updated.";
        }
      }

      if (menuPageStatus) {
        try {
          const slugUpdateStatus = await Manage_Service.update(
            { page_slug: req.body.slug },
            { where: { id: req.body.parentService } }

          );

          if (!slugUpdateStatus) {
            resMessage = "There is some technical issue while updating page.";
          }
        } catch (err) {
          resMessage = "Menu not updated.";
        }
      }

      return res.status(200).json({
        status: true,
        message: resMessage,
        data: { title, slug, image, description },
      });
      // return  result;
    } else {
      const menuPageStatus = await MenuPages.update(
        {
          title: title,
          slug: slug,
          description: description,
        },
        { where: { id: id } }
      );
      let resMessage = "Successfully updated.";
      if (menuPageStatus) {
        try {
          const slugUpdateStatus = await navbarMenu.update(
            { page_slug: req.body.slug },
            { where: { id: req.body.parentMenu } }
          );

          if (!slugUpdateStatus) {
            resMessage = "There is some technical issue while updating page.";
          }
        } catch (err) {
          resMessage = "Menu not updated.";
        }
      }

      if (menuPageStatus) {
        try {
          const slugUpdateStatus = await Manage_Service.update(
            { page_slug: req.body.slug },
            { where: { id: req.body.parentService } }
          );

          if (!slugUpdateStatus) {
            resMessage = "There is some technical issue while updating page.";
          }
        } catch (err) {
          resMessage = "Menu not updated.";
        }
      }

      res.status(200).json({
        status: true,
        message: resMessage,
        data: { title, slug, description },
      });
    }
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ status: false, message: " Page is not  Updated", data: error });
  }
};

// export const menuPages = async (req, res, next) => {
//   try {

//   } catch (error) {
//     console.log();
//     res.status(500).json({ error: error });

//   }
// }

// let query =  `UPDATE navbars m JOIN pages p  SET m.page_slug=p.title {where:{m.id:p.id} };`
// let menuQuery = `UPDATE ${navbarMenu} m JOIN ${MenuPages} p  SET ${m.page_slug}=${p.title} {where:{{m.id:p.id}} };`
