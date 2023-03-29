import React from "react";
import { Box, Button } from "@mui/material";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import UserFields from "./UserFields";
import useAxios from "../useAxios";
import * as paths from "../PathHelper";

const Unit = () => {
  const { userId } = useParams();
  const { user, setUser } = useOutletContext();
  const navigate = useNavigate();
  const axios = useAxios();

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .put(paths.API.USERS(userId), document.querySelector("#userForm"))
      .then((res) => {
        const id = res.data.id;
        setUser(res.data);
        navigate("/users/" + id);
      });
  };

  return (
    <Box
      component="form"
      id="userForm"
      onSubmit={handleSubmit}
      sx={{ width: 1, maxWidth: "sm" }}
    >
      <UserFields user={user} />

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

export default Unit;
