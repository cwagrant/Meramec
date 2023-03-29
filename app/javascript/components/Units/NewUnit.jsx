import React from "react";
import { Box, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import UnitFormFields from "./FormFields";
import useAxios from "../useAxios";
import { useSnackbar } from "notistack";
import * as paths from "../PathHelper";

const Unit = () => {
  const { propertyId } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const axios = useAxios(enqueueSnackbar);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(paths.API.UNITS(), document.querySelector("#unitForm"))
      .then((res) => {
        const id = res.data.id;
        navigate(`/properties/${propertyId}/units/${id}`);
      });
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
      <input
        type="hidden"
        name="unit[property_id]"
        id="unit_property_id"
        value={propertyId}
      />
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
