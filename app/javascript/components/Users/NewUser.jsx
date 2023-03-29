import React from "react";
import { Box, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import UserFields from "./UserFields";
import useAxios from "../useAxios";
import * as paths from "../PathHelper";
import { useSnackbar } from "notistack";

const User = () => {
  const { propertyId } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const axios = useAxios(enqueueSnackbar);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(paths.API.USERS(), document.querySelector("#userForm"))
      .then((res) => {
        const user = res.data;

        navigate(`/users/${user.id}`);
        enqueueSnackbar(
          `New user ${user.email} created, their temporary password is: ${user.password}`,
          { variant: "info", autoHideDuration: 15000 },
        );
      })
      .catch((error) => console.log(error));
  };

  return (
    <Box
      component="form"
      id="userForm"
      onSubmit={handleSubmit}
      sx={{
        width: 1,
        maxWidth: "sm",
        "& .MuiFormControl-root": { m: 1, maxWidth: "sm" },
      }}
    >
      <UserFields generatePassword />

      <Box sx={{ display: "flex", m: 1 }}>
        <Button
          variant="outlined"
          type="submit"
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default User;
