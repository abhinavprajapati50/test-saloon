import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Avatar } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const emailValidator =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2}))$/;

// /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
const passwordValidator =
  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="">
        Your Website
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
}

const theme = createTheme();

export const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [validEmail, setvalidEmail] = useState(false);
  const navigate = useNavigate();

  const onChangeHanlder = (e) => {
    setEmail(e.target.value);

    // validator();
  };

  const validation = (email) => {
    if (emailValidator.test(email)) {
      return setvalidEmail(true);
    } else {
      return setvalidEmail(false);
    }
  };

  console.log(emailValidator.test(email));
  // console.log("false email", email.toLowerCase().match(emailValidator));
  // console.log(
  //   "false password",
  //   password.toLowerCase().match(passwordValidator)
  // );

  const onChangeHanlder1 = (e) => {
    setPassword(e.target.value);
  };

  const loggedInHandler = async (event) => {
    event.preventDefault();
    setEmailError(true);
    setPassError(true);
    validation();
    try {
      const result = await axios.post("http://localhost:5000/signin", {
        email: email,
        password: password,
      });
      toast.success(result.data.message);
      localStorage.setItem("user", 1);
      setIsLoggedIn(true);
      navigate("admin", { return: true });
    } catch (error) {
      // setEmailError(true);
      return toast.error("Invalid Credentials");

      // console.log(error);
    }
  };

  return (
    <>
      {/* <ToastContainer /> */}
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ marginLeft: "10rem" }}>
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
            </div>
            <Box
              autoComplete="off"
              component="form"
              onSubmit={loggedInHandler}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                autoComplete="off"
                margin="normal"
                fullWidth
                id="email"
                required
                label="Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {/* {!emailValidator.test(email) ? <p> {error}</p> : ""} */}
              {emailError && !email && (
                <p style={{ color: "red", marginTop: "-0.2rem" }}>
                  Plz enter your email.{" "}
                </p>
              )}
              {validEmail ? <span> Plz fill Valid Message</span> : ""}

              <TextField
                autoComplete="off"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />

              {/* {passError && <p style={{ color: "red" }}>Invalid Password</p>} */}
              {passError && !password && (
                <p style={{ color: "red", marginTop: "-0.2rem" }}>
                  Plz Enter your password.
                </p>
              )}

              <Button
                type="submit"
                // fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, ml: 20 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item></Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};
