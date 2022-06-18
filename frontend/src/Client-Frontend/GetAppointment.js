import React, { useState } from "react";

import Link from "@mui/material/Link";

import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";

import { toast } from "react-toastify";
import axios from "axios";


export const GetAppointment = () => {
  const [open, setOpen] = useState(false);

  const [updatedItemModal, setupdatedItemModal] = useState(false);

  const [title, setTitle] = useState("");
  const [slug, setslug] = useState("");
  const [image, setimage] = useState("");
  const [description, setDescription] = useState([]);
  const [chr_delete] = useState(0);
  const [update, setupdate] = useState(false);
  const [parentMenu, setparentMenu] = useState(0);
  // const confirm = useConfirm();

  // console.log("delete page -->>", deletePage);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setupdatedItemModal(false);
    setupdate(false);
    if (!title || !slug || !image || !description) {
      toast.error("Plz Fill all the field");
      return;
    }
    try {
      const formData = new FormData();
      // // chr_delete
      // console.log("the data", image);
      formData.append("title", title);
      formData.append("slug", slug);
      formData.append("image", image);
      formData.append("description", description);
      formData.append(`chr_delete`, chr_delete);
      formData.append(`parentMenu`, parentMenu);
      const result = await axios.post(
        "http://localhost:5000/admin/allpages",
        formData
      );
      console.log(result);
      toast.success(result.data.message);
      // setOpen(false);
      // apiFunc();
      // handleClose();
      // openUpdateModalHandler()
      return result.data;
    } catch (error) {
      toast.error(error);
      return console.log("error: " + error);
    }
  };
  return (
    <>
      <h1>Get appointment</h1>
      {/*  */}
    </>
  );
};
