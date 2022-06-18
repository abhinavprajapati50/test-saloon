import * as React from "react";
import HoverMenu from "material-ui-popup-state/HoverMenu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import {
  usePopupState,
  bindHover,
  bindMenu,
} from "material-ui-popup-state/hooks";
import axios from "axios";

export const Demoss = () => {
  const [menuData, setmenuData] = React.useState([]);
  const [childMenu, setchildMenu] = React.useState([]);

  const popupState = usePopupState({
    variant: "popover",
    popupId: "demoMenu",
  });

  const handleChooseSubMenu = (id) => {
    // console.log(id);
    const childMenuData = menuData.filter((curMenu) =>
      curMenu.parent_Menu === id ? curMenu.title : console.log("null")
    );
    setchildMenu(childMenuData);
    // setAnchorElNav(null);
  };

  console.log(childMenu);

  React.useEffect(async () => {
    let allMenu = await axios.get("http://localhost:5000/admin/allmenu");
    setmenuData(allMenu.data.data);
    return allMenu;
  }, []);

  return (
    <React.Fragment>
      <Button variant="contained" {...bindHover(popupState)}>
        Hover to open Menu
      </Button>
      {menuData.map((menu) =>
        menu.parent_Menu === 0 ? (
          <Button
            key={menu.id}
            variant="contained"
            {...bindHover(popupState)}
            onMouseOver={() => handleChooseSubMenu(menu.id)}
            // onMouseOver={() => popupState.open()}
          >
            {menu.title}
          </Button>
        ) : null
      )}
      <HoverMenu
        {...bindMenu(popupState)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {childMenu.map((curMenu) => (
          <MenuItem onClick={popupState.close}>{curMenu.title}</MenuItem>
        ))}
      </HoverMenu>

      <HoverMenu
        {...bindMenu(popupState)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        {childMenu.map((curMenu) => (
          <MenuItem onClick={popupState.close}>{curMenu.title}</MenuItem>
        ))}
      </HoverMenu>
    </React.Fragment>
  );
};
