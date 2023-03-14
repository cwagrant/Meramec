import React from "react";
import { gql, useMutation } from "@apollo/client";
import { Box, Button } from "@mui/material";
import { useOutletContext, useParams } from "react-router-dom";
import FormFields from "./FormFields";
import { dollarsToCents } from "../DataFormatHelpers";

const ADD_PAYMENT = gql`
  mutation AddPayment($attributes: PaymentCreateInput!) {
    paymentCreate(input: $attributes) {
      payment{
        customerId,
        date,
        amountInCents,
        rentalAgreementPayments{
          rentalAgreementId,
          amountInCents,
          paidMonths,
          paidUntil,
          note
        }

      }
    }
  }
`;

const New = () => {
  const [addPayment, { data, loading, error }] = useMutation(
    ADD_PAYMENT,
  );

  const [payment, setPayment] = React.useState({
    date: null,
    customer: null,
    rentalAgreementPayments: [],
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    let formData = new FormData(event.target);
    let { customer, date, rentalAgreementPayments } = payment;
    let raps = [];

    for (const value of Object.values(rentalAgreementPayments)) {
      let { rentalAgreement, ...rentalAgreementPayment } = value;
      let { amount, paidMonths, ...rap } = rentalAgreementPayment;

      raps.push({
        ...rap,
        rentalAgreementId: rentalAgreement.id,
        amountInCents: dollarsToCents(amount),
        paidMonths: parseInt(paidMonths),
      });
    }

    let preparedData = {
      attributes: {
        paymentInput: {
          customerId: customer.id,
          date: payment.date,
          rentalAgreementPayments: raps,
        },
      },
    };

    addPayment({ variables: preparedData });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: 1,
        maxWidth: "md",
        "& .MuiFormControl-root": { m: 1, maxWidth: "md" },
      }}
    >
      <FormFields
        payment={payment}
        onChange={(newValue) => {
          setPayment(newValue);
        }}
      />

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

export default New;

//TODO we want to show something that gives us th name of the unit,
// the type of unit, the price, the address, additional details, and
// eventually the current renter and possibly even additional details
// about them or such.
//
// Possibly even doing an inline form but I think not.
