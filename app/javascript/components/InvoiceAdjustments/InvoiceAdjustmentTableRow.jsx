import React from "react";
import { Box, IconButton, TableCell, TableRow, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const InvoiceTableRow = ({ row, onDelete }) => {
  const reasonDescription = () => {
    if (row.reason == "other") {
      return `${row.type_of} - ${row.reason_description}`;
    }

    return `${row.type_of} - ${row.reason}`;
  };
  return (
    <TableRow
      key={row.id}
      sx={{ cursor: "pointer" }}
    >
      <TableCell>
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
      </TableCell>
      <TableCell>{reasonDescription()}</TableCell>
      <TableCell align="right">${row.price}</TableCell>
    </TableRow>
  );
};

export default InvoiceTableRow;
