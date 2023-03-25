import React from "react";
import { Box, Button } from "@mui/material";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import FormFields from "./FormFields";
import useAxios from "../useAxios";

const UPDATE_PROPERTY_URL = "/api/properties/";

const Edit = () => {
  const { propertyId } = useParams();
  const { currentProperty, setCurrentProperty } = useOutletContext();
  const navigate = useNavigate();
  const axios = useAxios();

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .put(
        `${UPDATE_PROPERTY_URL}${propertyId}`,
        document.querySelector("#propertyForm"),
      )
      .then((res) => {
        const id = res.data.id;

        setCurrentProperty(res.data);
        navigate("/properties/" + id);
      })
      .catch((error) => console.log(error));
  };

  console.log("getprop", currentProperty);
  return (
    <Box
      component="form"
      id="propertyForm"
      onSubmit={handleSubmit}
      sx={{
        width: 1,
        maxWidth: "sm",
        "& .MuiFormControl-root": { m: 1, maxWidth: "sm" },
      }}
    >
      <FormFields values={currentProperty} />

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

//TODO we want to show something that gives us th name of the unit,
// the type of unit, the price, the address, additional details, and
// eventually the current renter and possibly even additional details
// about them or such.
//
// Possibly even doing an inline form but I think not.
