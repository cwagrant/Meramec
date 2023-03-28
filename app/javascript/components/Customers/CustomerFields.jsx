import React from "react";
import { Box, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import MuiPhoneNumber from "material-ui-phone-number";

const StyledInput = styled(TextField)(({ theme }) => ({
  width: "100%",
  margin: theme.spacing(1),
  maxWidth: theme.breakpoints.sm,
}));

const insertAt = (str, sub, pos) =>
  `${str.slice(0, pos)}${sub}${str.slice(pos)}`;

const FormFields = ({ customer, onChange, readOnly }) => {
  const [localCustomer, setLocalCustomer] = React.useState({
    first_name: customer?.first_name || "",
    last_name: customer?.last_name || "",
    gate_code: customer?.gate_code || "",
    email: customer?.email || "",
    company: customer?.customer || "",
    phone: customer?.phone || "",
  });

  React.useEffect(() => {
    if (customer) {
      setLocalCustomer(customer);
    }
  }, [customer]);

  React.useEffect(() => {
    if (onChange) {
      onChange(localCustomer);
    }
  }, [localCustomer]);

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
          value={localCustomer.company}
          onChange={(event) => {
            setLocalCustomer({
              ...localCustomer,
              company: event.target.value,
            });
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
          value={localCustomer.first_name}
          onChange={(event) => {
            setLocalCustomer({
              ...localCustomer,
              first_name: event.target.value,
            });
          }}
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
          value={localCustomer.last_name}
          onChange={(event) => {
            setLocalCustomer({
              ...localCustomer,
              last_name: event.target.value,
            });
          }}
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
          value={localCustomer.gate_code}
          onChange={(event) => {
            setLocalCustomer({
              ...localCustomer,
              gate_code: event.target.value,
            });
          }}
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
          value={localCustomer.email}
          onChange={(event) => {
            setLocalCustomer({
              ...localCustomer,
              email: event.target.value,
            });
          }}
          InputProps={{
            readOnly: readOnly,
          }}
        />
        <MuiPhoneNumber
          name="customer[phone_number]"
          id="customer_phone_number"
          variant="outlined"
          defaultCountry={"us"}
          value={localCustomer.phone_number}
          onChange={(value) => {
            setLocalCustomer({
              ...localCustomer,
              phone_number: value,
            });
          }}
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

export default FormFields;
