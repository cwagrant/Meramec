import React from "react";
import { Grid, TextField } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const PropertyFields = ({ property, dispatch }) => {
  if (!property) return <CircularProgress />;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          required
          label="Name"
          placeholder="Name"
          sx={{ width: 1 }}
          value={property.name}
          onChange={(event) => {
            dispatch({ type: "name", value: event.target.value });
          }}
        />
      </Grid>
    </Grid>
  );
};

export default PropertyFields;
