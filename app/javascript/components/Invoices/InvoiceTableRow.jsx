import React from "react";
import { Box, Link, TableCell, TableRow } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PaymentIcon from "@mui/icons-material/Payment";
import PaidIcon from "@mui/icons-material/Paid";

const InvoiceTableRow = ({ row, onDelete }) => {
  const navigate = useNavigate();

  return (
    <TableRow
      hover
      onClick={(event) => navigate(`/invoices/${row.id}`)}
      role="checkbox"
      tabIndex={-1}
      key={row.id}
      sx={{ cursor: "pointer" }}
    >
      <TableCell>{row.date}</TableCell>
      <TableCell>{row.customer.formal_name}</TableCell>
      <TableCell>{row.customer.company}</TableCell>
      <TableCell>{row.state}</TableCell>
      <TableCell>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <Link
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              let target = row.payment_id
                ? row.payment_id
                : `new?customer=${row.customer.id}`;
              navigate(`/payments/${target}`);
            }}
          >
            {row.payment_id ? <PaidIcon /> : <PaymentIcon />}
          </Link>
          <Link
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              navigate(`/invoices/${row.id}/edit`);
            }}
          >
            <EditIcon />
          </Link>
          <Link
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              if (
                !window.confirm(
                  "Are you sure you wish to delete this invoice?",
                )
              ) return;
              onDelete(row.id);
            }}
          >
            <DeleteIcon />
          </Link>
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default InvoiceTableRow;
