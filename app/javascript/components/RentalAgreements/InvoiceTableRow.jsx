import React from "react";
import { TableCell, TableRow, TextField } from "@mui/material";
import { centsToDollars } from "../DataFormatHelpers";

const InvoiceTableRow = ({ row, readOnly, onChange }) => {
  const { item } = row;
  return (
    <TableRow
      tabIndex={-1}
      key={row.id}
      sx={{ cursor: "pointer" }}
    >
      <TableCell>{item.frequency_in_months} month(s) rent</TableCell>
      <TableCell>{item.name}</TableCell>
      <TableCell>${centsToDollars(item.price_in_cents)}</TableCell>
      <TableCell align="right">
        <TextField
          type="number"
          value={row.item_count}
          onChange={(event) => {
            onChange("item_count", event.target.value);
          }}
          readOnly={readOnly}
          sx={{ width: "50px" }}
        />
      </TableCell>
    </TableRow>
  );
};

export default InvoiceTableRow;
