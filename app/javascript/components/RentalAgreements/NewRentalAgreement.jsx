import React from "react";
import { gql, useMutation } from "@apollo/client";
import { Box, Button } from "@mui/material";
import { useOutletContext, useParams } from "react-router-dom";
import FormFields from "./FormFields";

const ADD_RENTAL_AGREEMENT = gql`
  mutation AddRentalAgreement($attributes: RentalAgreementCreateInput!) {
    rentalAgreementCreate(input: $attributes) {
      rentalAgreement{
        id
        firstName
        lastName
      }
    }
  }
`;

const Edit = () => {
  const [addRentalAgreement, { data, loading, error }] = useMutation(
    ADD_RENTAL_AGREEMENT,
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    let formData = new FormData(event.target);

    let preparedData = {
      "attributes": {
        "rentalAgreementInput": {
          "firstName": formData.get("firstName"),
          "lastName": formData.get("lastName"),
        },
      },
    };

    addRentalAgreement({ variables: preparedData });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: 1,
        maxWidth: "md",
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
//
// 2023-2-15 I think we'll do like we did with the units autocomplete dropdown
// for Customers
//
// Then we can also have it be that you can select an option for "Add Customer..." and that
// will render the fields for the UserForm so you can put in the user's information.
//
// Finally we'll need to add the basic terms logic to add a rental term with a start and end
// date
//
