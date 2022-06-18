import React, { useEffect, useState } from "react";
import "./CSS/ManagePages.css";
import { styled } from "@mui/material/styles";
import axios from "axios";

import ButtonUnstyled, {
  buttonUnstyledClasses,
} from "@mui/base/ButtonUnstyled";
import { TableComponent } from "../TableComponent";




const blue = {
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2",
};

const CustomButtonRoot = styled("button")`
  font-family: IBM Plex Sans, sans-serif;
  font-weight: bold;
  font-size: 0.875rem;
  background-color: ${blue[500]};
  padding: 12px 24px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: ${blue[600]};
  }

  &.${buttonUnstyledClasses.active} {
    background-color: ${blue[700]};
  }

  &.${buttonUnstyledClasses.focusVisible} {
    box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1),
      0 0 0 5px rgba(0, 127, 255, 0.5);
    outline: none;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// First_name, Last_name, Email, Mobile, Service_Type, Date, Remark, Status, Action

const columns = [
  { id: 1, label: "First_name", minWidth: 170 },
  { label: "Last_name", minWidth: 100 },
  {
    label: "Email",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Mobile",
    label: "Mobile",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    label: "Service_Type",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    label: "Date",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    label: "Remark",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    label: "Status",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    label: "Action",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];


export const ManageAppointment = () => {
  const [appointmentData, setappointmentData] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);


  // appontment/reject



 
  function CustomButton(props) {
    return <ButtonUnstyled {...props} component={CustomButtonRoot} />;
  }

  // const handleApproved = async (data) => {
  //   //   console.log("aprroved", data);
  //   let appoitmentStatus = appointmentData.find(
  //     (curData) => curData.id === data.id
  //   );
  //   console.log(appoitmentStatus);
  //   try {
  //     let result = await axios.put(
  //       `http://localhost:5000/admin/appontment/aprooved/${appoitmentStatus.id}`
  //     );
  //     setstatus("1");
  //     return result;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // const handleRejected = async (data) => {
  //   console.log("Rejected", data);
  //   let appoitmentStatus = appointmentData.find(
  //     (curData) => curData.id === data.id
  //   );
  //   console.log(appoitmentStatus);
  //   try {
  //     const rejectedData = await axios.put(
  //       `http://localhost:5000/admin/appontment/reject/${appoitmentStatus.id}`
  //     );
  //     setstatus("0");
  //     console.log(rejectedData);
  //     return rejectedData;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };


  const allAppointmentHandler = async () => {

    const appointmentData = await axios.get(`http://localhost:5000/admin/appontment`)
    console.log(appointmentData);
    setappointmentData(appointmentData.data.data)
    
  }
  useEffect(() => {
    allAppointmentHandler()
  }, [])

  return (
    <>
      <header className="header">Manage Appointment</header>

      <TableComponent
        columns={columns}
        data={appointmentData}
        page={page}
        rowsPerPage={rowsPerPage}
        CustomButton={CustomButton}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
        // status={status}

      />

      
    </>
  );
};
