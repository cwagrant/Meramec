import React from "react";
import { Box, TextField } from "@mui/material";

const FormFields = ({ user, readOnly, generatePassword }) => {
  const [userEmail, setUserEmail] = React.useState("");

  React.useEffect(() => {
    setUserEmail(user?.email || "");
  }, [user]);

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <TextField
          required
          id="user_email"
          label="Email"
          name="user[email]"
          placeholder="Email"
          sx={{ width: 1, m: 1, maxWidth: "sm" }}
          value={userEmail}
          onChange={(event) => {
            setUserEmail(event.target.value);
          }}
          InputProps={{
            readOnly: readOnly,
          }}
        />
        {!generatePassword &&
          (
            <TextField
              id="user_password"
              label="Password"
              name="user[password]"
              placeholder="Password"
              type="password"
              sx={{ width: 1, m: 1, maxWidth: "sm" }}
              InputProps={{
                readOnly: readOnly,
              }}
            />
          )}
      </Box>
    </>
  );
};

export default FormFields;
