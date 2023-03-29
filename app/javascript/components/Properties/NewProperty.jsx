import React from "react";
import { Box, Button } from "@mui/material";
import FormFields from "./FormFields";
import { useNavigate } from "react-router-dom";
import useAxios from "../useAxios";
import { useSnackbar } from "notistack";

const ADD_PROPERTY_URL = "/api/properties";

const Property = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const axios = useAxios(enqueueSnackbar);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(ADD_PROPERTY_URL, document.querySelector("#propertyForm"))
      .then((res) => {
        const id = res.data.id;
        enqueueSnackbar("New property created successfully", {
          variant: "success",
        });
        navigate("/properties/" + id);
      });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      id="propertyForm"
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

export default Property;
