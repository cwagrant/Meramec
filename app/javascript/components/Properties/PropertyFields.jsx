import React from "react";
import { Box, TextField } from "@mui/material";

const PropertyFields = ({ property, onChange }) => {
  if (!property) return <h4>Loading...</h4>;
  return (
    <Box sx={{ display: "flex" }}>
      <TextField
        required
        id="property_name"
        label="Name"
        name="property[name]"
        placeholder="Name"
        sx={{ width: 1 }}
        value={property.name}
        onChange={(event) => {
          onChange({ ...property, name: event.target.value });
        }}
      />
    </Box>
  );
};

export default PropertyFields;
