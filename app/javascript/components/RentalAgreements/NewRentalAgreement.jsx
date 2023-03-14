import React from "react";
import { gql, useMutation } from "@apollo/client";
import { Box, Button, Paper } from "@mui/material";
import FormFields from "./FormFields";
import { useNavigate } from "react-router-dom";

const ADD_RENTAL_AGREEMENT = gql`
  mutation AddRentalAgreement($attributes: RentalAgreementCreateInput!) {
    rentalAgreementCreate(input: $attributes) {
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

const New = () => {
  const [rentalAgreement, setRentalAgreement] = React.useState(null);
  const navigate = useNavigate();
  const [addRentalAgreement, { data, loading, error }] = useMutation(
    ADD_RENTAL_AGREEMENT,
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

      addRentalAgreement({
        variables: preparedData,
        onCompleted: (data) => {
          const id = data.rentalAgreementCreate.rentalAgreement.id;
          navigate("/agreements/" + id);
        },
      });
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

export default New;

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
