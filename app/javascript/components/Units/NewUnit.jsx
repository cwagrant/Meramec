import React from "react";
import { Box, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import UnitFormFields from "./FormFields";
import useAxios from "../useAxios";
import * as paths from "../PathHelper";

const Unit = () => {
  const { propertyId } = useParams();
  const axios = useAxios();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(paths.API.UNITS(), document.querySelector("#unitForm"))
      .then((res) => {
        const id = res.data.id;
        navigate(`/properties/${propertyId}/units/${id}`);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Box
      component="form"
      id="unitForm"
      onSubmit={handleSubmit}
      sx={{
        width: 1,
        maxWidth: "sm",
        "& .MuiFormControl-root": { m: 1, maxWidth: "sm" },
      }}
    >
      <UnitFormFields values={{}} />

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
