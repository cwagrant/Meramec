import React from "react";
import { Box, Button } from "@mui/material";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import FormFields from "./FormFields";
import useAxios from "../useAxios";
import * as paths from "../PathHelper";

const Unit = () => {
  const { propertyId, unitId } = useParams();
  const { currentUnit, setCurrentUnit } = useOutletContext();
  const navigate = useNavigate();
  const axios = useAxios();

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .put(paths.API.UNITS(unitId), document.querySelector("#unitForm"))
      .then((res) => {
        const id = res.data.id;
        setCurrentUnit(res.data);
        navigate("/properties/" + id);
      })
      .catch((error) => console.log(error));
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
