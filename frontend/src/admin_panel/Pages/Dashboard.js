import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { Manage_Services } from "./Manage_Services";
import Tabs from "@mui/material/Tabs";
import { Tab } from "@mui/material";

export const Dashboard = ({ setadmin }) => {
  // useEffect(() => {
  //   return () => setadmin(true)
  // }, [])

  return (
    <>
      <header className="header">Dashboad</header>
      <div className="image">
        {/* <img
          src="./images/saloon_store.jpg"
          alt="Saloon"
          style={{
            width: "69.4rem",
            height: "34.460rem",
            // height: "34.468rem",
          }}
        /> */}
      </div>
      <h1
        style={{
          textAlign: "center",
          position: "absolute",
          top: "17.3rem",
          left: "23rem",
          letterSpacing: "2rem",
          // color: "#f34343",
          color: "white",
          fontSize: 48,
        }}
      >
        BEAUTY SALOON
      </h1>
      {/* text-align: center;
    margin-bottom: -12rem;
    position: absolute;
    top: 173px;
    left: 31rem;
    letter-spacing: 2rem; */}
    </>
  );
};
