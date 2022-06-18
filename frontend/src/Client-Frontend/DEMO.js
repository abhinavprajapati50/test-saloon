import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@material-tailwind/react/Navbar";
import NavbarContainer from "@material-tailwind/react/NavbarContainer";
import NavbarCollapse from "@material-tailwind/react/NavbarCollapse";
import Nav from "@material-tailwind/react/Nav";
import NavLink from "@material-tailwind/react/NavLink";
import Dropdown from "@material-tailwind/react/Dropdown";
import DropdownItem from "@material-tailwind/react/DropdownItem";
import Icon from "@material-tailwind/react/Icon";
import Button from "@material-tailwind/react/Button";

export const Demo = ({menuData}) => {
  const [openNavbar, setOpenNavbar] = useState(false);

  return (

    <>
      
      <h1>the home componernrs</h1>

      {menuData}


      <div className="absolute w-full z-20" style={{display: 'none'}}>
        <Navbar color="transparent" navbar>
          <NavbarContainer>
            

            <NavbarCollapse open={openNavbar}>
              <Nav>
                <div className="flex flex-col z-50 lg:flex-row lg:items-center">
                  <NavLink
                    href="https://material-tailwind.com/documentation/quick-start?ref=mtk"
                    target="_blank"
                    rel="noreferrer"
                    ripple="light"
                  >
                  </NavLink>
                 
                  <div className="text-white">
                    <Dropdown
                      color="transparent"
                      size="sm"
                      buttonType="link"
                      buttonText={
                        <div className="py-2.5 font-medium flex items-center">
                          <Icon name="view_carousel" size="2xl" color="white" />
                          <span className="ml-2">Templates</span>
                        </div>
                      }
                      ripple="light"
                    >
                      <Link to="/">
                        <DropdownItem color="lightBlue">Landing</DropdownItem>
                      </Link>
                      <Link to="/profile">
                        <DropdownItem color="lightBlue">Profile</DropdownItem>
                      </Link>
                      <Link to="/login">
                        <DropdownItem color="lightBlue">Login</DropdownItem>
                      </Link>
                      <Link to="/register">
                        <DropdownItem color="lightBlue">Register</DropdownItem>
                      </Link>
                    </Dropdown>
                    <Dropdown
                      color="transparent"
                      size="sm"
                      buttonType="link"
                      buttonText={
                        <div className="py-2.5 font-medium flex items-center">
                          <Icon name="view_carousel" size="2xl" color="white" />
                          <span className="ml-2">Templates</span>
                        </div>
                      }
                      ripple="light"
                    >
                      <Link to="/">
                        <DropdownItem color="lightBlue">ddd</DropdownItem>
                      </Link>
                      <Link to="/profile">
                        <DropdownItem color="lightBlue">ff</DropdownItem>
                      </Link>
                      
                    </Dropdown>
                  </div>
                  
                  
                </div>
              </Nav>
            </NavbarCollapse>
          </NavbarContainer>
        </Navbar>
      </div>
    </>
  );
};
