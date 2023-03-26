import React from "react";
import {
  Alert,
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import useAxios from "../useAxios";
import * as paths from "../PathHelper";
import { useNavigate, useParams } from "react-router-dom";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export const Login = () => {
  const [error, setError] = React.useState();
  const theme = useTheme();
  const axios = useAxios();
  const navigate = useNavigate();
  let urlParams = new URLSearchParams(window.location.search);
  let redirect_to = urlParams.get("redirect_to");

  // on loading the page we check if the user is still active
  // if so we'll redirect them to the main site. Otherwise
  // they're exactly where they need to be.
  React.useEffect(() => {
    if (redirect_to === null) {
      axios
        .get(paths.API.USER.CHECKIN())
        .then((response) => {
          if (redirect_to) {
            window.location = redirect_to;
          } else {
            window.location = "/";
          }
        })
        .catch((error) => {
          // console.log(error);
        });
    }
  }, []);

  const loginSubmit = (event) => {
    event.preventDefault();

    axios
      .post(paths.API.USER.LOGIN(), document.querySelector("#loginForm"))
      .then((response) => {
        if (response.headers.authorization) {
          localStorage.setItem(
            "user",
            JSON.stringify({
              user: response.data.data.email,
              user_email: response.data.data.email,
              token: response.headers.authorization.replace("Bearer", ""),
            }),
          );

          if (redirect_to) {
            window.location = redirect_to;
          } else {
            navigate("..");
          }
        }

        return response.data;
      })
      .catch((error) => setError(error.response.data));
  };

  React.useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(null);
      }, 4000);
    }
  }, [error]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          id="loginForm"
          component="form"
          onSubmit={loginSubmit}
          sx={{
            width: 1,
            maxWidth: 400,
            mt: 2,
            "& .MuiFormControl-root": { m: 1, maxWidth: "sm" },
          }}
        >
          <Paper
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              p: 3,
            }}
          >
            <AccountCircleIcon sx={{ fontSize: "10rem", mb: 8 }} />
            <Typography variant="h3" sx={{ mb: 2 }}>Meramec</Typography>
            <TextField
              fullWidth
              id="user_email"
              name="user[email]"
              label="Email"
            />
            <TextField
              fullWidth
              id="user_password"
              name="user[password]"
              label="Password"
              type="password"
            />
            <Box sx={{ display: "flex", width: 1, m: 1, gap: 2 }}>
              <Button
                sx={{ flexGrow: 1 }}
                variant="contained"
                type="reset"
                color="secondary"
              >
                Clear
              </Button>
              <Button
                sx={{ flexGrow: 1 }}
                variant="contained"
                type="submit"
              >
                Login
              </Button>
            </Box>
          </Paper>
          {error &&
            (
              <Alert
                severity="error"
                sx={{ m: 2 }}
              >
                {error}
              </Alert>
            )}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export const Logout = () => {
  const navigate = useNavigate();

  const user_storage = localStorage.getItem("user");
  const user_json = JSON.parse(user_storage);
  const axios = useAxios();

  if (user_json) {
    let { token, ...user } = user_json;

    axios
      .delete(paths.API.USER.LOGOUT())
      .then((res) => {
        localStorage.setItem(JSON.stringify({ ...user }));
        navigate("/login");
      })
      .catch((error) => {
        if (token) {
          localStorage.setItem("user", JSON.stringify({ ...user }));
        }
        navigate("/login");
      });
  }
};
