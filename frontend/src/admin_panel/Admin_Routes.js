import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Navigate } from "react-router";
import { Home } from "../Client-Frontend/Home";
import { Dashboard } from "./Pages/Dashboard";
import { ManageMenu } from "./Pages/ManageMenu";
import { ManagePages } from "./Pages/ManagePages";
import { SideBar } from "./Sidebar";
import { NavBar } from "../Client-Frontend/NavBar";
import { ConfirmProvider } from "material-ui-confirm";
import { Manage_Services } from "./Pages/Manage_Services";
import { ManageAppointment } from "./Pages/ManageAppointment";
import Header from "./Pages/Header";
import "./Pages/CSS/Admin_Routes.css";
import { Tab, Tabs } from "@mui/material";
import { auto } from "@popperjs/core";

export const Admin_Routes = ({
  setIsLoggedIn,
  setadmin,
  admin,
  isLoggedIn,
}) => {
  useEffect(() => {
    setadmin(true);
  }, [admin]);
  return (
    <div>
      <header>
        <Header setIsLoggedIn={setIsLoggedIn} setAdmin={setadmin} />
      </header>
      <main>
        <div className="main">
          <div
            className="sidebar"
          >
            <SideBar setIsLoggedIn={setIsLoggedIn} setAdmin={setadmin} />
          </div>
          
          <div
            className="data_grid"
            style={{
              width: "85%",
              float: "left",
            }}
          >
            <Routes>
              <Route path="admin" element={<Dashboard />} />
              <Route
                path="admin/managemenu"
                element={
                  <ConfirmProvider>
                    <ManageMenu />{" "}
                  </ConfirmProvider>
                }
              />
              <Route path="admin/managepage" element={<ManagePages />} />
              <Route path="admin/allservice" element={<Manage_Services />} />
              <Route path="admin/appontment" element={<ManageAppointment />} />
              <Route path="*" element={<Navigate replace to="/admin" />} />
            </Routes>
          </div>
        </div>
      </main>
    </div>
  );
};
