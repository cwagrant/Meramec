import React from "react";
import { Box, Button } from "@mui/material";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

import useAxios from "../useAxios";
import PropertyFields from "./PropertyFields";
import simpleReducer from "../reducer";
import AddressFields from "../Addresses/AddressFields";
import { Address } from "../Models";

const ADD_PROPERTY_URL = "/api/properties";

const Property = () => {
  const [property, dispatch] = React.useReducer(simpleReducer, {
    name: "",
    address: { ...Address },
  });
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const axios = useAxios(enqueueSnackbar);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(ADD_PROPERTY_URL, { property: property })
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
      <PropertyFields
        property={property}
        dispatch={dispatch}
      />

      <AddressFields
        address={property.address}
        dispatch={dispatch}
      />

      <Box sx={{ display: "flex", m: 1, gap: 2 }}>
        <Button
          variant="outlined"
          type="submit"
        >
          Submit
        </Button>
        <Button
          variant="outlined"
          type="button"
          onClick={(event) => {
            event.preventDefault();
            if (!window.confirm("Are you sure you wish to cancel?")) return;
            navigate("..");
          }}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default Property;
