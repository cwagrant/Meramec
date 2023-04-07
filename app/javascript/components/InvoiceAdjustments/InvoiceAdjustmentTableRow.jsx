import React from "react";
import { Box, IconButton, TableCell, TableRow } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { centsToDollars } from "../DataFormatHelpers";

const InvoiceTableRow = ({ row, readOnly, onDelete }) => {
  const reasonDescription = () => {
    if (row.reason == "other") {
      return `${row.type_of} - ${row.reason_description}`;
    }

    return `${row.type_of} - ${row.reason}`;
  };
  return (
    <TableRow
      key={row.id}
      sx={{
        cursor: "pointer",
        display: row?._destroy === 1 ? "none" : "table-row",
      }}
    >
      <TableCell>
        {!readOnly && (
          <Box>
            <IconButton
              color="error"
              onClick={() => {
                onDelete(row.id);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        )}
      </TableCell>
      <TableCell>{reasonDescription()}</TableCell>
      <TableCell align="right">${centsToDollars(row.price_in_cents)}</TableCell>
    </TableRow>
  );
};

export default InvoiceTableRow;
