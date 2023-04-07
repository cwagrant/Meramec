import React from "react";
import { Grid, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";

const StyledInput = styled(TextField)(({ theme }) => ({
  width: "100%",
  maxWidth: theme.breakpoints.sm,
}));

const AddressFields = (
  { address, dispatch, readOnly, namespace = ["address"] },
) => {
  const ns = (field) => {
    if (!namespace) return field;

    if (!Array.isArray(namespace)) {
      return namespace;
    }

    return [...namespace, field].join(".");
  };

  if (!address) return <CircularProgress />;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <StyledInput
          required
          label="Address Line 1"
          placeholder="Street 1"
          value={address.address_1}
          onChange={(event) => {
            dispatch({ type: ns("address_1"), value: event.target.value });
          }}
          InputProps={{
            readOnly: readOnly,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <StyledInput
          label="Address Line 2"
          placeholder="Street 2"
          value={address.address_2 || ""}
          onChange={(event) =>
            dispatch({ type: ns("address_2"), value: event.target.value })}
          InputProps={{
            readOnly: readOnly,
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <StyledInput
          required
          label="City"
          placeholder="City"
          value={address.city}
          onChange={(event) =>
            dispatch({ type: ns("city"), value: event.target.value })}
          InputProps={{
            readOnly: readOnly,
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <StyledInput
          label="State"
          placeholder="State"
          value={address.state_code}
          onChange={(event) =>
            dispatch({ type: ns("state_code"), value: event.target.value })}
          InputProps={{
            readOnly: readOnly,
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <StyledInput
          required
          label="Zipcode"
          placeholder="Zipcode"
          value={address.zipcode}
          onChange={(event) =>
            dispatch({ type: ns("zipcode"), value: event.target.value })}
          InputProps={{
            readOnly: readOnly,
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <StyledInput
          label="Country"
          placeholder="Country"
          value={address.country || ""}
          onChange={(event) =>
            dispatch({
              type: ns("country_code"),
              value: event.target.value,
            })}
          InputProps={{
            readOnly: readOnly,
          }}
        />
      </Grid>
    </Grid>
  );
};

export default AddressFields;
