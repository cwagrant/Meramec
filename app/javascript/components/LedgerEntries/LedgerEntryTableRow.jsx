import React from "react";
import { TableCell, TableRow } from "@mui/material";
import { centsToDollars } from "../DataFormatHelpers";
import dayjs from "dayjs";

const presentAmount = (amount) => {
  let formattedAmount = amount < 0 ? (amount * -1) : amount;

  formattedAmount = centsToDollars(formattedAmount) || "0.00";

  return amount < 0 ? `(${formattedAmount})` : formattedAmount;
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
      <TableCell>{row.source_type}</TableCell>
      <TableCell align="right">{centsToDollars(row.amount_in_cents)}</TableCell>
      <TableCell align="right">{presentAmount(row.balance_in_cents)}</TableCell>
    </TableRow>
  );
};

export default PaymentTableRow;
