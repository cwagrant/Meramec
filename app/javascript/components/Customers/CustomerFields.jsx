import React from "react";
import { Box, Grid, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import MuiPhoneNumber from "material-ui-phone-number";

const StyledInput = styled(TextField)(({ theme }) => ({
  width: "100%",
  maxWidth: theme.breakpoints.sm,
}));

const CustomerFields = ({ customer, onChange, readOnly }) => {
  if (!customer) return;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <StyledInput
          label="Company"
          placeholder="Company"
          value={customer.company || ""}
          onChange={(event) => {
            onChange({ ...customer, company: event.target.value });
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
            onChange({ ...customer, first_name: event.target.value })}
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
            onChange({ ...customer, last_name: event.target.value })}
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
            onChange({ ...customer, gate_code: event.target.value })}
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
            onChange({ ...customer, email: event.target.value })}
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
          readOnly={readOnly}
          disableDropdown={readOnly}
          name="customer[phone_number]"
          id="customer_phone_number"
          variant="outlined"
          defaultCountry={"us"}
          value={customer.phone_number || ""}
          onChange={(newValue) =>
            onChange({ ...customer, phone_number: newValue })}
          sx={{
            width: "100%",
          }}
        />
      </Grid>
    </Grid>
  );
};

export default CustomerFields;
