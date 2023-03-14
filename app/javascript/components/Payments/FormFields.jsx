import React from "react";
import {
  Autocomplete,
  Box,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { gql, useLazyQuery } from "@apollo/client";

import { default as RentalAgreementPayment } from "../RentalAgreementPayments/FormFields";

import SelectCustomer from "../Customers/SelectCustomer2";

const StyledInput = styled(TextField)(({ theme }) => ({
  width: "100%",
  margin: theme.spacing(1),
  maxWidth: theme.breakpoints.sm,
}));

const FIND_CUSTOMER_AGREEMENTS = gql`
  query findCustomerAgreements($customer: CustomerInput) {
    rentalAgreements(attributes: { customer: $customer}) {
      id
      unit {
        id
        name
      }
      priceInCents
    }
  }
`;

const RAPS = ({ rentalAgreements, payment, onChange }) => {
  let { rentalAgreementPayments, ...rest } = payment;

  return rentalAgreements.map((rentalAgreement) => {
    let rap = rentalAgreementPayments[rentalAgreement.id];

    if (!rap) {
      rap = {
        amount: "",
        paidMonths: "",
        note: "",
        rentalAgreement: rentalAgreement,
      };
    }

    return (
      <Paper key={rentalAgreement?.id} elevation={3} sx={{ mb: 1 }}>
        <RentalAgreementPayment
          rentalAgreementPayment={rap}
          onChange={(value) => {
            onChange(value);
          }}
        />
      </Paper>
    );
  });
};

const FormFields = ({ payment, onChange, readOnly }) => {
  const [value, setValue] = React.useState({
    date: null,
    customer: null,
    rentalAgreementPayments: [],
  });
  const [customerId, setCustomerId] = React.useState(null);
  const [paymentDate, setPaymentDate] = React.useState("");
  const [findAgreements, { data, error }] = useLazyQuery(
    FIND_CUSTOMER_AGREEMENTS,
  );

  let loading = false;

  React.useEffect(() => {
    if (!loading) {
      setPaymentDate(payment?.date ? dayjs(payment?.date) : dayjs());
    }
  }, []);

  React.useEffect(() => {
    onChange({
      ...payment,
      date: paymentDate,
    });
  }, [paymentDate]);

  React.useEffect(() => {
    findAgreements({ variables: { customer: { id: customerId } } });
  }, [customerId]);

  const addRentalAgreementPayment = (rap) => {
    let { rentalAgreementPayments, ...wholePayment } = payment;

    let raps = { ...rentalAgreementPayments };
    raps[rap.rentalAgreement.id] = rap;

    onChange({
      ...payment,
      rentalAgreementPayments: {
        ...raps,
      },
    });
  };

  return (
    <>
      <Paper
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <SelectCustomer
          customer={payment.customer}
          onChange={(newValue) => {
            onChange({
              ...payment,
              customer: newValue,
            });
            setCustomerId(newValue?.id);
          }}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            required
            id="date"
            name="date"
            label="Date"
            sx={{ width: 1, m: 1, maxWidth: "sm" }}
            value={paymentDate}
            onChange={(newValue) => {
              setPaymentDate(newValue);
            }}
          />
        </LocalizationProvider>
      </Paper>
      <Paper sx={{ my: 1 }}>
        <Box sx={{ width: 1 }}>
          <Divider>Rental Agreements</Divider>
          {data && (
            <RAPS
              rentalAgreements={data.rentalAgreements}
              payment={payment}
              onChange={(rap) => {
                addRentalAgreementPayment(rap);
              }}
            />
          )}
        </Box>
      </Paper>
    </>
  );
};

export default FormFields;
//TODO
//What's next?
//We need the ability to select a rentalagreement for the given customer and then enter
//the rentalagreementpayment fields (amount, paid_months)
//probably need to backtrack and add a cost_in_cents field to RentalAgreements
//
// Probably need a amount_in_cents field on RentalAgreementPayment to so that she can type
// in a value to go towards a payment (e.g. $500) and it would auto divide the amount
// by RA cost to determine how many months the person has paid for. Will be a dumb guess (won't
// take into account lateness, etc) but will at least give a number to make life a bit easier.
//
// Need to allow multiple RAPayments per Payment (prepopulate all existing? Or select from dropdown)
//
// Add notes field to RAPayments for information
// Need a way to determine if the person is late or not when paying. If late how many months late?
