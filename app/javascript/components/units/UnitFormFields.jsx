import React from "react";
import {
  Box,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { centsToDollars } from "../DataFormatHelpers";

const UnitFormFields = (props) => {
  const [unitType, setUnitType] = React.useState("");
  const [unitName, setUnitName] = React.useState("");
  const [unitPrice, setUnitPrice] = React.useState(0);

  const handleChange = (event) => {
    setUnitType(event.target.value);
  };

  const readOnly = props?.readOnly;

  React.useEffect(() => {
    setUnitType(props.values?.typeOf || "");
    setUnitName(props.values?.name || "");
    setUnitPrice(centsToDollars(props.values?.priceInCents || 0));
  }, [props.values]);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <TextField
          required
          id="name"
          label="Name"
          name="name"
          placeholder="Name"
          sx={{ width: 1, m: 1, maxWidth: "sm" }}
          value={unitName}
          onChange={(event) => {
            setUnitName(event.target.value);
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
          "& .MuiFormControl-root": { m: 1, maxWidth: "sm" },
        }}
      >
        <FormControl sx={{ width: 1 / 2 }}>
          <InputLabel id="unit-type-select-label">Type</InputLabel>
          <Select
            labelId="unit-type-select-label"
            id="unit-type-select"
            label="Type"
            name="typeOf"
            value={unitType}
            onChange={handleChange}
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

        <FormControl sx={{ width: 1 / 2 }}>
          <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            name="priceInCents"
            id="standard-adornment-amount"
            label="Amount"
            type="number"
            value={unitPrice}
            onChange={(event) => {
              setUnitPrice(event.target.value);
            }}
            readOnly={readOnly}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        </FormControl>
      </Box>
    </>
  );
};

export default UnitFormFields;
