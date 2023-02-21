import React from "react";
import { Box, TextField } from "@mui/material";

const FormFields = (props) => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [gateCode, setGateCode] = React.useState("");

  React.useEffect(() => {
    setFirstName(props.values?.firstName || "");
    setLastName(props.values?.lastName || "");
    setEmail(props.value?.email || "");
    setGateCode(props.value?.gateCode || "");
  }, [props.values]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <TextField
          required
          id="firstName"
          label="First Name"
          name="firstName"
          placeholder="First Name"
          sx={{ width: 1 }}
          value={firstName}
          onChange={(event) => {
            setFirstName(event.target.value);
          }}
        />
        <TextField
          required
          id="lastName"
          label="Last Name"
          name="lastName"
          placeholder="Last Name"
          sx={{ width: 1 }}
          value={lastName}
          onChange={(event) => {
            setLastName(event.target.value);
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
        <TextField
          required
          id="email"
          label="Email"
          name="email"
          placeholder="Email"
          sx={{ width: 1 }}
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <TextField
          required
          id="gateCode"
          label="Gate Code"
          name="gateCode"
          placeholder="Gate Code"
          sx={{ width: 1 }}
          value={gateCode}
          onChange={(event) => {
            setGateCode(event.target.value);
          }}
        />
      </Box>
    </>
  );
};

export default FormFields;
