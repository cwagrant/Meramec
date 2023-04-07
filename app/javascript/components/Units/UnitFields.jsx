import React from "react";
import {
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { centsToDollars, dollarsToCents } from "../DataFormatHelpers";

const FormFields = ({ unit, dispatch, hidePrice, readOnly }) => {
  if (!unit) return <h4>Loading...</h4>;

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            label="Name"
            placeholder="Name"
            sx={{ width: 1 }}
            value={unit.name || ""}
            onChange={(event) => {
              dispatch({ type: "name", value: event.target.value });
            }}
            InputProps={{
              readOnly: readOnly,
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl sx={{ width: 1 }}>
            <InputLabel id="unit-type-select-label">Type</InputLabel>
            <Select
              labelId="unit-type-select-label"
              id="unit_type_of"
              label="Type"
              name="unit[type_of]"
              value={unit.type_of || ""}
              onChange={(event) => {
                dispatch({ type: "type_of", value: event.target.value });
              }}
              readOnly={readOnly}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="apartment">Apartment</MenuItem>
              <MenuItem value="storage">Storage</MenuItem>
              <MenuItem value="parking">Parking</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {!hidePrice &&
          (
            <Grid item xs={12}>
              <TextField
                type="number"
                value={unit.price || ""}
                onChange={(event) => {
                  dispatch({ type: "price", value: event.target.value });
                  dispatch({
                    type: "price_in_cents",
                    value: dollarsToCents(event.target.value),
                  });
                }}
                readOnly={readOnly}
                sx={{ width: 1 }}
                InputProps={{
                  readOnly: readOnly,
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
            </Grid>
          )}
      </Grid>
    </>
  );
};

export default FormFields;
