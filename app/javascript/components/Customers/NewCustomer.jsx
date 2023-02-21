import React from "react";
import { gql, useMutation } from "@apollo/client";
import { Box, Button } from "@mui/material";
import { useOutletContext, useParams } from "react-router-dom";
import FormFields from "./FormFields";

const ADD_CUSTOMER = gql`
  mutation AddCustomer($attributes: CustomerCreateInput!) {
    customerCreate(input: $attributes) {
      customer{
        id
        firstName
        lastName
      }
    }
  }
`;

const Edit = () => {
  const [addCustomer, { data, loading, error }] = useMutation(
    ADD_CUSTOMER,
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    let formData = new FormData(event.target);

    let preparedData = {
      "attributes": {
        "customerInput": {
          "firstName": formData.get("firstName"),
          "lastName": formData.get("lastName"),
        },
      },
    };

    addCustomer({ variables: preparedData });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: 1,
        maxWidth: "sm",
        "& .MuiFormControl-root": { m: 1, maxWidth: "sm" },
      }}
    >
      <FormFields values={{}} />

      <Box sx={{ display: "flex", m: 1 }}>
        <Button
          variant="outlined"
          type="submit"
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default Edit;

//TODO we want to show something that gives us th name of the unit,
// the type of unit, the price, the address, additional details, and
// eventually the current renter and possibly even additional details
// about them or such.
//
// Possibly even doing an inline form but I think not.
