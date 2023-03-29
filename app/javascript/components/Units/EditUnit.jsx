import React from "react";
import { Box, Button } from "@mui/material";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import FormFields from "./FormFields";
import useAxios from "../useAxios";
import { useSnackbar } from "notistack";
import * as paths from "../PathHelper";

const Unit = () => {
  const { propertyId, unitId } = useParams();
  const { currentUnit, setCurrentUnit } = useOutletContext();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const axios = useAxios(enqueueSnackbar);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .put(paths.API.UNITS(unitId), document.querySelector("#unitForm"))
      .then((res) => {
        const id = res.data.id;
        setCurrentUnit(res.data);
        enqueueSnackbar("Unit updated successfully", { variant: "success" });
        navigate("/properties/" + id);
      });
  };

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
      <FormFields unit={currentUnit} />

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
