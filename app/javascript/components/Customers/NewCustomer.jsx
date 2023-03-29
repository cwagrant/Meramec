import React from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FormFields from "./CustomerFields";
import useAxios from "../useAxios";
import * as paths from "../PathHelper";
import useNotifications from "../useNotifications";

const Edit = () => {
  const axios = useAxios();
  const navigate = useNavigate();
  const { pushNotification } = useNotifications();

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(paths.API.CUSTOMERS(), document.querySelector("#customerForm"))
      .then((res) => {
        const id = res.data.id;
        pushNotification("Customer created successfully", "success");
        navigate(`/customers/${id}`);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Box
      component="form"
      id="customerForm"
      onSubmit={handleSubmit}
      sx={{
        width: 1,
        maxWidth: "sm",
        "& .MuiFormControl-root": { m: 1, maxWidth: "sm" },
      }}
    >
      <FormFields values={{}} />

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

export default Edit;
