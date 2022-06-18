import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router";
import { Home } from "./Home";
import { NavBar } from "./NavBar";

export const Frontend_Route = ({ setadmin, admin, setIsLoggedIn }) => {
  useEffect(() => {
    setadmin(false);
  }, [admin]);
  return (
    <div>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </div>
  );
};
