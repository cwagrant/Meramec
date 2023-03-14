import React from "react";
import { Box, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledInput = styled(TextField)(({ theme }) => ({
  width: "100%",
  margin: theme.spacing(1),
  maxWidth: theme.breakpoints.sm,
}));

const FormFields = ({ values, onChange, readOnly }) => {
  const [customer, setCustomer] = React.useState({
    firstName: values?.firstName || "",
    lastName: values?.lastName || "",
    gateCode: values?.gateCode || "",
    email: values?.email || "",
  });

  React.useEffect(() => {
    if (onChange) {
      onChange(customer);
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
          required
          id="firstName"
          label="First Name"
          name="firstName"
          placeholder="First Name"
          value={customer.firstName}
          onChange={(event) => {
            setCustomer({
              ...customer,
              firstName: event.target.value,
            });
          }}
          InputProps={{
            readOnly: readOnly,
          }}
        />
        <StyledInput
          required
          id="lastName"
          label="Last Name"
          name="lastName"
          placeholder="Last Name"
          value={customer.lastName}
          onChange={(event) => {
            setCustomer({
              ...customer,
              lastName: event.target.value,
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
          required
          id="email"
          label="Email"
          name="email"
          placeholder="Email"
          value={customer.email}
          onChange={(event) => {
            setCustomer({
              ...customer,
              email: event.target.value,
            });
          }}
          InputProps={{
            readOnly: readOnly,
          }}
        />
        <StyledInput
          required
          id="gateCode"
          label="Gate Code"
          name="gateCode"
          placeholder="Gate Code"
          value={customer.gateCode}
          onChange={(event) => {
            setCustomer({
              ...customer,
              gateCode: event.target.value,
            });
          }}
          InputProps={{
            readOnly: readOnly,
          }}
        />
      </Box>
    </>
  );
};

export default FormFields;
