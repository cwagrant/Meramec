import React from "react";
import { Box, Button } from "@mui/material";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import UnitFields from "./UnitFields";
import useAxios from "../useAxios";
import { useSnackbar } from "notistack";
import * as paths from "../PathHelper";

const Unit = () => {
  const { propertyId, unitId } = useParams();
  const { unit, setUnit } = useOutletContext();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const axios = useAxios(enqueueSnackbar);

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

  if (!unit) return <h4>Loading...</h4>;

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
      <UnitFields unit={unit} onChange={(newValue) => setUnit(newValue)} />

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

export default Unit;
