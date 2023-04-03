import React from "react";
import { Box, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import UnitFields from "./UnitFields";
import useAxios from "../useAxios";
import { useSnackbar } from "notistack";
import * as paths from "../PathHelper";

const Unit = () => {
  const { propertyId } = useParams();
  const [unit, setUnit] = React.useState({
    name: "",
    type_of: "",
    price_in_cents: "",
    property_id: propertyId,
  });
  const { enqueueSnackbar } = useSnackbar();
  const axios = useAxios(enqueueSnackbar);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(paths.API.UNITS(), { unit: unit })
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
