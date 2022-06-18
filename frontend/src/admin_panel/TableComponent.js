import {  Paper, TablePagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import axios from "axios";
export const TableComponent = ({
  columns,
  page,
  rowsPerPage,
  CustomButton,
  setPage,
  setRowsPerPage,
}) => {
  const [status, setstatus] = useState(2);
  const [data, setdata] = useState([]);

  const allAppointmentHandler = async () => {

    const appointmentData = await axios.get(`http://localhost:5000/admin/appontment`)
    console.log(appointmentData);
    setdata(appointmentData.data.data)
    setstatus(2)

  }
  useEffect(() => {
    allAppointmentHandler()
  }, [status])


  const datehandle = (data) => {
    let theDate = new Date(Date.parse(data.date));
    return theDate.toLocaleDateString();
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleApproved = async (data) => {
    try {
      let result = await axios.put(
        `http://localhost:5000/admin/appontment/aprooved/${data.id}`
      );
      setstatus(1);
      // handleApproved()
      return result;
    } catch (error) {
      console.log(error);
    }
  };
  const handleRejected = async (data) => {
    console.log(data);
    try {
      // console.log("data", data);
      let rejectedData = await axios.put(
        `http://localhost:5000/admin/appontment/reject/${data.id}`
      );
      setstatus(0);
      return rejectedData;

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="main">
        <Paper
          sx={{
            width: "94.4%",
            overflow: "hidden",
            padding: "1rem",
            right: "13rem",
          }}
        >
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        {console.log(row)}
                        {/* {columns.map((column) => {
                          const value = row[column.id]; */}

                        <>
                          <TableCell key={row.id}>{row.first_name}</TableCell>
                          <TableCell>{row.last_name}</TableCell>
                          <TableCell align="right">{row.email}</TableCell>
                          <TableCell align="right">{row.mobile}</TableCell>
                          <TableCell align="center">
                            {row.service_type}
                          </TableCell>
                          {/* <TableCell align="right" >   {row.email} </TableCell> */}
                          <TableCell align="right">{datehandle(row)}</TableCell>
                          <TableCell align="right"> {row.remark} </TableCell>
                          {/* <TableCell align="right"  >   {row.status} </TableCell> */}
                          {/* <TableCell> */}

                          {row.status == 2 && (
                            <TableCell align="right">
                              <CustomButton
                                disabled
                                style={{
                                  background: "orange",
                                  color: "white",
                                }}
                              >
                                Pending
                              </CustomButton>
                            </TableCell>
                          )}
                          {row.status === 1 && (
                            <TableCell align="right">
                              <CustomButton
                                disabled
                                style={{
                                  background: "green",
                                  color: "white",
                                }}
                              >
                                Approved
                              </CustomButton>
                            </TableCell>
                          )}
                          {row.status == 0 && (
                            <TableCell align="right">
                              <CustomButton
                                disabled
                                style={{ background: "red", color: "white" }}
                              >
                                Rejected
                              </CustomButton>

                              {/* <Button variant="outlined" disabled style={{background: "red", color:"white"}}> Rejected</Button> */}
                            </TableCell>
                          )}
                          {row.status == 2 ? (
                            <TableCell align="right">
                              <CheckCircleIcon
                                style={{
                                  color: "green",
                                  cursor: "pointer",
                                  // marginLeft: "6px",
                                }}
                                onClick={() => handleApproved(row)}
                              />
                              <CancelRoundedIcon
                                style={{
                                  color: "red",
                                  cursor: "pointer",
                                  // marginLeft: "6px",
                                }}
                                onClick={() => handleRejected(row)}
                              />
                            </TableCell>
                          ) : (
                            <TableCell align="right"> NA</TableCell>
                          )}
                          {/* </TableCell> */}
                        </>

                        {/* })} */}
                        {/* <TableCell>{() => statusHandler}</TableCell> */}
                        {/* <TableCell  > <div style={{ color: "green", cursor: "pointer" }}> <CheckCircleIcon /> </div> <div style={{ color: "red", cursor: "pointer" }}> <CancelRoundedIcon /> </div> </TableCell> */}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </div>
  );
};
