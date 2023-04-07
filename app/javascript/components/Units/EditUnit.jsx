import React from "react";
import { Box, Button, Divider } from "@mui/material";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { isEmpty } from "lodash";

import UnitFields from "./UnitFields";
import useAxios from "../useAxios";
import * as paths from "../PathHelper";
import simpleReducer from "../reducer";
import AddressFields from "../Addresses/AddressFields";
import { Address, Unit } from "../Models";
import { centsToDollars } from "../DataFormatHelpers";

const EditUnit = () => {
  const { propertyId, unitId } = useParams();
  const { unit: contextUnit, setUnit } = useOutletContext();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const axios = useAxios(enqueueSnackbar);
  const [unit, dispatch] = React.useReducer(simpleReducer, {
    ...Unit,
    address: { ...Address },
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .put(paths.API.UNITS(unitId), { unit: unit })
      .then((res) => {
        setUnit(res.data);
        enqueueSnackbar("Unit updated successfully", { variant: "success" });
        navigate("/properties/" + propertyId);
      });
  };

  React.useEffect(() => {
    if (isEmpty(contextUnit)) return;

    let addPrice = {
      ...contextUnit,
      price: centsToDollars(contextUnit.price_in_cents),
    };

    dispatch({ type: "initialize", value: addPrice });
  }, [contextUnit]);

  return (
    <Box
      component="form"
      id="unitForm"
      onSubmit={handleSubmit}
      sx={{ width: 1, maxWidth: "sm" }}
    >
      <input
        type="hidden"
        id="unit_property_id"
        name="unit[property_id]"
        value={propertyId}
      />
      <UnitFields unit={unit} dispatch={dispatch} />

      <Divider sx={{ my: 2 }}>Address</Divider>
      <AddressFields
        address={unit.address}
        dispatch={dispatch}
      />

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

export default EditUnit;
