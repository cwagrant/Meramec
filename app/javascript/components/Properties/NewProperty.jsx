import React from "react";
import { Box, Button } from "@mui/material";
import FormFields from "./FormFields";
import { useNavigate } from "react-router-dom";
import useAxios from "../useAxios";

const ADD_PROPERTY_URL = "/api/properties";

const Property = () => {
  const navigate = useNavigate();
  const axios = useAxios();

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(ADD_PROPERTY_URL, document.querySelector("#propertyForm"))
      .then((res) => {
        const id = res.data.id;
        navigate("/properties/" + id);
      })
      .catch((error) => console.log(error));
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

//TODO we want to show something that gives us th name of the unit,
// the type of unit, the price, the address, additional details, and
// eventually the current renter and possibly even additional details
// about them or such.
//
// Possibly even doing an inline form but I think not.
