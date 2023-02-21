import React from "react";
import { gql, useMutation } from "@apollo/client";
import { Box, Button, Paper } from "@mui/material";
import { useOutletContext, useParams } from "react-router-dom";
import FormFields from "./FormFields";

const UPDATE_RENTAL_AGREEMENT = gql`
  mutation UpdateRentalAgreement($attributes: RentalAgreementUpdateInput!) {
    rentalAgreementUpdate(input: $attributes) {
      rentalAgreement{
        id
        customer {
          id
          firstName
          lastName
          formalName
        }
        unit {
          id
          name
        }
      }
    }
  }
`;

const Edit = () => {
  const { rentalAgreementId } = useParams();
  const { rentalAgreement } = useOutletContext();
  const [updateRentalAgreement, { data, loading, error }] = useMutation(
    UPDATE_RENTAL_AGREEMENT,
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    let formData = new FormData(event.target);

    let preparedData = {
      "attributes": {
        "id": rentalAgreementId,
        "rentalAgreementInput": {
          "firstName": formData.get("firstName"),
          "lastName": formData.get("lastName"),
        },
      },
    };

    updateRentalAgreement({ variables: preparedData });
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
      <Paper sx={{ p: 1 }}>
        <FormFields values={rentalAgreement} />

        <Box sx={{ display: "flex", m: 1 }}>
          <Button
            variant="outlined"
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </Paper>
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
