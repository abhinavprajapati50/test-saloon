const navbarMenu = require("../Model/navBarMenu");
const { Op } = require("sequelize");

// UPDATE navbars m
// JOIN pages p
// on m.id=p.id
// SET m.page_slug=p.title


// UPDATE navbars nm JOIN pages p on nm.id=p.id SET nm.page_slug=p.title;

exports.manageMenu = async (req, res, next) => {
  const { id, title, parent_Menu, page_slug, chr_delete } = req.body;
  // const data = { id, title, parent_Menu };
  if (!title) {
    return res.status(400).json({ message: "Plz enter the title" });
  }

  try {
    const result_menu = await navbarMenu.create({ title, parent_Menu, chr_delete });
    
    res
      .status(200)
      .json({
        status: true,
        message: "Created Menu Successfully",
        data: result_menu,
      });
  } catch (error) {
    console.log("-----error", error);
    res
      .status(500)
      .json({
        status: false,
        message: "Something went wrong to Create Menu",
        data: error,
      });
  }
};

exports.allMenu = async (req, res, next) => {
  try {
    const allData = await navbarMenu.findAll( {where :{ chr_delete:0  }});
    // res.status(201).json({ allData });
    // console.log("-------------------------");
    // console.log(allData);
    res
      .status(200)
      .json({
        status: true,
        message: "Get All Menus Successfully",
        data: allData,
      });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: false, message: "Something went wrong", data: error });
  }
};

exports.deleteMenu = async (req, res, next) => {
  let id = req.params.id;
  try {
    const deltedMenu = await navbarMenu.update(
      { chr_delete: 1 },
      { where: { id: id } }
    );
    // console.log(deltedMenu);
    // res.status(201).json(deltedMenu);
    res
      .status(200)
      .json({
        status: true,
        message: " Deleted successfully ",
        data: deltedMenu,
      });
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: " Error in delete api", data: error });
  }
};

exports.updateManu = async (req, res) => {
  const { title, parent_Menu } = req.body;

  // let id = req.params.id;

  try {
    const product = await navbarMenu.update(
      { title, parent_Menu },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res
      .status(200)
      .json({
        status: true,
        message: " successfully updated",
        data: { title, parent_Menu },
      });
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: " Error in delete api", data: error });
  }
};


// exports.parent_ChildMenu = async (req, res, next) => {
//   try {
//     const allData = await navbarMenu.findAll({ where: { chr_delete: 0 } });
//     let is_subMenu = 0;
//     let subMenuData = [];

//     allData.forEach((element) => {
//       // console.log("====the foractch");
//       console.log(element.id = element.parent_Menu)
//         is_subMenu = 1;
//         const daata = subMenuData.push(element.title)
//         // console.log(daata);
      
//     });
//     // res.status(201).json({ allData });
    
//     res
//       .status(200)
//       .json({
//         status: true,
//         message: "Get All Menus Successfully",
//         data: allData,
//       });
//   } catch (error) {
//     console.log(error);
//     res
//       .status(500)
//       .json({ status: false, message: "Something went wrong", data: error });
//   }
// };

// export const menuPages = async (req, res, next) => {
//   try {

//   } catch (error) {
//     console.log();
//     res.status(500).json({ error: error });

//   }
// }
