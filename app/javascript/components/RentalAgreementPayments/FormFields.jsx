import React from "react";
import { Box, Switch, Table, TextField, Typography } from "@mui/material";
import { gql, useQuery } from "@apollo/client";
import { centsToDollars } from "../DataFormatHelpers";

const FormFields = ({ rentalAgreementPayment, onChange }) => {
  const [paid, setPaid] = React.useState(0);

  let rentalAgreement = rentalAgreementPayment?.rentalAgreement;

  const changeHandler = (newValue, key) => {
    let tempValue = { ...rentalAgreementPayment };

    tempValue[key] = newValue;

    onChange(tempValue);
  };

  return (
    <>
      <TextField
        disabled
        name={"unitName" + rentalAgreement.id}
        id={"unitName" + rentalAgreement.id}
        placeholder="Name"
        label="Name"
        value={rentalAgreement.unit?.name}
      />
      <TextField
        disabled
        name={"raCost" + rentalAgreement.id}
        id={"raCost" + rentalAgreement.id}
        placeholder="Cost"
        label="Cost"
        value={centsToDollars(rentalAgreement.priceInCents || 0)}
      />
      <TextField
        name={"amountPaid" + rentalAgreement.id}
        id={"amountPaid" + rentalAgreement.id}
        placeholder="Paid"
        label="Paid"
        value={rentalAgreementPayment.amount}
        onChange={(event) => changeHandler(event.target.value, "amount")}
      />
      <TextField
        name={"paidMonths" + rentalAgreement.id}
        id={"paidMonths" + rentalAgreement.id}
        placeholder="Months"
        label="Months Paid"
        value={rentalAgreementPayment.monthsPaid}
        onChange={(event) => changeHandler(event.target.value, "paidMonths")}
        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
      />
      <TextField
        multiline
        name={"notes" + rentalAgreement.id}
        id={"notes" + rentalAgreement.id}
        label="Notes"
        value={rentalAgreementPayment?.note}
        rows={3}
        sx={{ width: 1, pr: 2 }}
        onChange={(event) => changeHandler(event.target.value, "note")}
      />
    </>
  );
};

export default FormFields;
