import React from "react";
import {
  Box,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { centsToDollars } from "../DataFormatHelpers";

const FormFields = ({ unit, onChange, hidePrice, readOnly }) => {
  const [price, setPrice] = React.useState("");

  React.useEffect(() => {
    if (unit?.price_in_cents) {
      setPrice(centsToDollars(unit.price_in_cents));
    }
  }, [unit?.price_in_cents]);

  if (!unit) return <h4>Loading...</h4>;

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="unit_name"
            label="Name"
            name="unit[name]"
            placeholder="Name"
            sx={{ width: 1 }}
            value={unit.name || ""}
            onChange={(event) => {
              onChange({ ...unit, name: event.target.value });
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
                onChange({ ...unit, type_of: event.target.value });
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
                value={price}
                onChange={(event) => {
                  setPrice(event.target.value);
                  onChange({ ...unit, price: event.target.value });
                }}
                readOnly={readOnly}
                sx={{ width: 1 }}
                InputProps={{
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
