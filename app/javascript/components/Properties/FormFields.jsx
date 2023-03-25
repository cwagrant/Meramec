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

const FormFields = (props) => {
  const [name, setName] = React.useState("");

  React.useEffect(() => {
    setName(props.values?.name || "");
  }, [props.values]);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <TextField
          required
          id="property_name"
          label="Name"
          name="property[name]"
          placeholder="Name"
          sx={{ width: 1 }}
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
      </Box>
    </>
  );
};

export default FormFields;
