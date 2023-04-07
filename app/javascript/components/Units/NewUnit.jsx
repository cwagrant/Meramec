import React from "react";
import { Box, Button, Divider } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

import UnitFields from "./UnitFields";
import useAxios from "../useAxios";
import * as paths from "../PathHelper";
import simpleReducer from "../reducer";
import AddressFields from "../Addresses/AddressFields";
import { Address, Unit } from "../Models";

const NewUnit = () => {
  const { enqueueSnackbar } = useSnackbar();
  const axios = useAxios(enqueueSnackbar);
  const navigate = useNavigate();
  const { propertyId } = useParams();
  const [unit, dispatch] = React.useReducer(simpleReducer, {
    ...Unit,
    property_id: propertyId,
    address: { ...Address },
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(paths.API.UNITS(), { unit: unit })
      .then((res) => {
        const id = res.data.id;
        enqueueSnackbar("Unit saved successfully.", {
          variant: "success",
        });
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
      }}
    >
      <input
        type="hidden"
        name="unit[property_id]"
        id="unit_property_id"
        value={propertyId}
      />
      <UnitFields unit={unit} dispatch={dispatch} />

      <Divider sx={{ my: 2 }}>Address</Divider>
      <AddressFields address={unit.address} dispatch={dispatch} />

      <Box sx={{ display: "flex", my: 2, gap: 2 }}>
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

export default NewUnit;
