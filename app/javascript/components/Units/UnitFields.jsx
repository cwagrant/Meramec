import React from "react";
import {
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
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
      <Box sx={{ display: "flex" }}>
        <TextField
          required
          id="unit_name"
          label="Name"
          name="unit[name]"
          placeholder="Name"
          sx={{ width: 1, m: 1, maxWidth: "sm" }}
          value={unit.name || ""}
          onChange={(event) => {
            onChange({ ...unit, name: event.target.value });
          }}
          InputProps={{
            readOnly: readOnly,
          }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: 1,
          flexDirection: "row",
          "& .MuiFormControl-root": { m: 1, maxWidth: "sm" },
        }}
      >
        <FormControl sx={{ flexGrow: 1 }}>
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

        {!hidePrice &&
          (
            <FormControl sx={{ flexGrow: 1 }}>
              <InputLabel htmlFor="standard-adornment-amount">
                Amount
              </InputLabel>
              <OutlinedInput
                id="unit_price"
                name="unit[price]"
                label="Price"
                type="number"
                value={price}
                onChange={(event) => {
                  setPrice(event.target.value);
                  onChange({ ...unit, price: event.target.value });
                }}
                readOnly={readOnly}
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
              />
            </FormControl>
          )}
      </Box>
    </>
  );
};

export default FormFields;
