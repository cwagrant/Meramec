import React from "react";
import { TableCell, TableRow } from "@mui/material";
import { centsToDollars } from "../DataFormatHelpers";
import dayjs from "dayjs";

const presentAmount = (amount) => {
  let formattedAmount = amount < 0 ? (amount * -1) : amount;

  formattedAmount = centsToDollars(formattedAmount) || "0.00";

  return amount < 0 ? `(${formattedAmount})` : formattedAmount;
};

const titleize = (word) => {
  if (word == "pre_payment") {
    return "Prepayment";
  }
  if (word == "prorate") {
    return "Prorate";
  }
  return word;
};

const sourceDescription = ({ source_type, source }) => {
  if (source_type == "AccountAdjustment") {
    if (source.type_of == "discount") {
      return `Discount - ${titleize(source.reason)}`;
    }

    if (source.type_of == "fee") {
      return `Fee - ${titleize(source.reason)}`;
    }
    return "Account Adjustment";
  }

  if (source_type == "RentalAgreementPayment") {
    return "Payment";
  }

  if (source_type == "RentalAgreement") {
    return "Rental Charge";
  }
};

const PaymentTableRow = ({ row }) => {
  return (
    <TableRow
      hover
      role="checkbox"
      tabIndex={-1}
      key={row.id}
    >
      <TableCell>{dayjs(row.date).format("YYYY/MM/DD")}</TableCell>
      <TableCell>{sourceDescription(row)}</TableCell>
      <TableCell align="right">{centsToDollars(row.amount_in_cents)}</TableCell>
      <TableCell align="right">{presentAmount(row.balance_in_cents)}</TableCell>
    </TableRow>
  );
};

export default PaymentTableRow;
