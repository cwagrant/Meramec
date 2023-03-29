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

const FormFields = ({ customer, readOnly }) => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [gateCode, setGateCode] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phoneNumber, setPhone] = React.useState("");

  React.useEffect(() => {
    if (customer) {
      if (customer.first_name) {
        setFirstName(customer.first_name);
      }
      if (customer.last_name) {
        setLastName(customer.last_name);
      }
      if (customer.company) {
        setCompany(customer.company);
      }
      if (customer.gate_code) {
        setGateCode(customer.gate_code);
      }
      if (customer.email) {
        setEmail(customer.email);
      }
      if (customer.phone_number) {
        setPhone(customer.phone_number);
      }
    }
  }, [customer]);

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
          value={company}
          onChange={(event) => setCompany(event.target.value)}
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
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
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
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
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
          value={gateCode}
          onChange={(event) => setGateCode(event.target.value)}
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
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          InputProps={{
            readOnly: readOnly,
          }}
        />
        <MuiPhoneNumber
          name="customer[phone_number]"
          id="customer_phone_number"
          variant="outlined"
          defaultCountry={"us"}
          value={phoneNumber}
          onChange={(newValue) => setPhone(newValue)}
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
