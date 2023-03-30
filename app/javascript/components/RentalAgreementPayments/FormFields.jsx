import React from "react";
import { TextField } from "@mui/material";
import { centsToDollars } from "../DataFormatHelpers";

const FormFields = ({ rentalAgreement }) => {
  const [paid, setPaid] = React.useState("");
  const [notes, setNotes] = React.useState("");

  console.log("ra", rentalAgreement);

  return (
    <>
      <input
        type="hidden"
        id="payment_rental_agreement_payments_rental_agreement_id"
        name="payment[rental_agreement_payments][][rental_agreement_id]"
        value={rentalAgreement.id}
      />
      <TextField
        disabled
        name={"unitName" + rentalAgreement.id}
        id={"unitName" + rentalAgreement.id}
        placeholder="Name"
        label="Name"
        value={rentalAgreement.unit.name}
      />
      <TextField
        disabled
        name={"raCost" + rentalAgreement.id}
        id={"raCost" + rentalAgreement.id}
        placeholder="Cost"
        label="Cost"
        value={centsToDollars(rentalAgreement.price_in_cents || 0)}
      />
      <TextField
        sx={{ width: 1 / 2 }}
        name="payment[rental_agreement_payments][][amount]"
        id="payment_rental_agreement_payments_amount"
        placeholder="Paid"
        label="Paid"
        value={paid}
        onChange={(event) => setPaid(event.target.value)}
      />
      <TextField
        multiline
        name="payment[rental_agreement_payments][][note]"
        id="payment_rental_agreement_payments_note"
        label="Notes"
        rows={3}
        value={notes}
        onChange={(event) => setNotes(event.target.value)}
        sx={{ width: 1, pr: 2 }}
      />
    </>
  );
};

export default FormFields;
