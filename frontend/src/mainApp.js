import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import { Login } from "./components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "./admin_panel/Pages/Dashboard";

export const MainApp = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("user"));
  let isLoggged = localStorage.getItem("user")
    ? localStorage.getItem("user")
    : null;

  return (
    <div>
      
        <Routes>
          <Route path="/" element={<Login isLoggedIn={isLoggedIn} />} />
        </Routes>
      
    </div>
  );
};
