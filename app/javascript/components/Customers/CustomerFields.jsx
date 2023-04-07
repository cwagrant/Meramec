import React from "react";
import { Grid, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import MuiPhoneNumber from "material-ui-phone-number";

const StyledInput = styled(TextField)(({ theme }) => ({
  width: "100%",
  maxWidth: theme.breakpoints.sm,
}));

const CustomerFields = ({ customer, dispatch, namespace, readOnly }) => {
  if (!customer) return;

  const ns = (field) => {
    if (!namespace) return field;

    if (!Array.isArray(namespace)) {
      return namespace;
    }

    return [...namespace, field].join(".");
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <StyledInput
          label="Company"
          placeholder="Company"
          value={customer.company || ""}
          onChange={(event) => {
            dispatch({ type: ns("company"), value: event.target.value });
          }}
          InputProps={{
            readOnly: readOnly,
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <StyledInput
          required
          label="First Name"
          placeholder="First Name"
          value={customer.first_name}
          onChange={(event) =>
            dispatch({ type: ns("first_name"), value: event.target.value })}
          InputProps={{
            readOnly: readOnly,
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <StyledInput
          required
          id="last_name"
          label="Last Name"
          name="customer[last_name]"
          placeholder="Last Name"
          value={customer.last_name}
          onChange={(event) =>
            dispatch({ type: ns("last_name"), value: event.target.value })}
          InputProps={{
            readOnly: readOnly,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <StyledInput
          required
          id="gate_code"
          label="Gate Code"
          name="customer[gate_code]"
          placeholder="Gate Code"
          value={customer.gate_code}
          onChange={(event) =>
            dispatch({ type: ns("gate_code"), value: event.target.value })}
          InputProps={{
            readOnly: readOnly,
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <StyledInput
          id="customer_email"
          label="Email"
          name="customer[email]"
          placeholder="Email"
          value={customer.email || ""}
          onChange={(event) =>
            dispatch({ type: ns("email"), value: event.target.value })}
          InputProps={{
            readOnly: readOnly,
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <MuiPhoneNumber
          InputProps={{
            readOnly: readOnly,
          }}
          label="Phone Number"
          readOnly={readOnly}
          disableDropdown={readOnly}
          name="customer[phone_number]"
          id="customer_phone_number"
          variant="outlined"
          defaultCountry={"us"}
          value={customer.phone_number || ""}
          onChange={(newValue) =>
            dispatch({ type: ns("phone_number"), value: event.target.value })}
          sx={{
            width: "100%",
          }}
        />
      </Grid>
    </Grid>
  );
};

export default CustomerFields;
