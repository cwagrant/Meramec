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
  const { agreementId } = useParams();
  const { rentalAgreement, setRentalAgreement } = useOutletContext();
  const [updateRentalAgreement, { data, loading, error }] = useMutation(
    UPDATE_RENTAL_AGREEMENT,
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    if (rentalAgreement.customer && rentalAgreement.unit) {
      let { __typename: _0, formalName: _, ...customer } =
        rentalAgreement.customer;
      let { __typename: _1, ...unit } = rentalAgreement.unit;
      let newCustomer = document.getElementById("newCustomer")?.value;

      let preparedData = {
        "attributes": {
          "id": agreementId,
          "rentalAgreementInput": {
            "unitId": unit.id,
          },
        },
      };

      if (document.getElementById("newCustomer").value === "true") {
        preparedData.attributes.rentalAgreementInput = {
          ...preparedData.attributes.rentalAgreementInput,
          customer: customer,
        };
      } else {
        preparedData.attributes.rentalAgreementInput = {
          ...preparedData.attributes.rentalAgreementInput,
          customerId: customer.id,
        };
      }

      updateRentalAgreement({ variables: preparedData });
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      id="raform"
      sx={{
        width: 1,
        maxWidth: "sm",
        "& .MuiFormControl-root": { m: 1, maxWidth: "sm" },
      }}
    >
      <Paper sx={{ p: 1 }}>
        <FormFields
          rentalAgreement={rentalAgreement}
          setRentalAgreement={setRentalAgreement}
        />

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
