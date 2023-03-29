import React from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FormFields from "./CustomerFields";
import useAxios from "../useAxios";
import { useSnackbar } from "notistack";
import * as paths from "../PathHelper";

const Edit = () => {
  const { enqueueSnackbar } = useSnackbar();
  const axios = useAxios(enqueueSnackbar);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(paths.API.CUSTOMERS(), document.querySelector("#customerForm"))
      .then((res) => {
        const id = res.data.id;
        enqueueSnackbar("Customer created successfully", {
          variant: "success",
        });
        navigate(`/customers/${id}`);
      });
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
