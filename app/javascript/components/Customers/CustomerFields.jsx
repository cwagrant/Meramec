import React from "react";
import { Box, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import MuiPhoneNumber from "material-ui-phone-number";

const StyledInput = styled(TextField)(({ theme }) => ({
  width: "100%",
  margin: theme.spacing(1),
  maxWidth: theme.breakpoints.sm,
}));

const CustomerFields = ({ customer, onChange, readOnly }) => {
  if (!customer) return;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <StyledInput
          id="customer_company"
          label="Company"
          name="customer[company]"
          placeholder="Company"
          value={customer.company || ""}
          onChange={(event) => {
            onChange({ ...customer, company: event.target.value });
          }}
          InputProps={{
            readOnly: readOnly,
          }}
        />
        <StyledInput
          required
          id="first_name"
          label="First Name"
          name="customer[first_name]"
          placeholder="First Name"
          value={customer.first_name}
          onChange={(event) =>
            onChange({ ...customer, first_name: event.target.value })}
          InputProps={{
            readOnly: readOnly,
          }}
        />
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
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: { xs: "wrap", sm: "nowrap" },
          justifyContent: "space-between",
        }}
      >
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
            m: 1,
            maxWidth: "sm",
          }}
        />
      </Box>
    </>
  );
};

export default CustomerFields;
