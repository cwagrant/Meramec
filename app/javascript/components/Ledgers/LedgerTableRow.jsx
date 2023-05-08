import React from "react";
import { Box, Link, TableCell, TableRow } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PaymentIcon from "@mui/icons-material/Payment";
import ReceiptIcon from "@mui/icons-material/Receipt";

import { centsToDollars } from "../DataFormatHelpers";

const LedgerTableRow = ({ row }) => {
  const navigate = useNavigate();

  return (
    <TableRow
      role="checkbox"
      tabIndex={-1}
      key={row.id}
      sx={{ cursor: "pointer" }}
    >
      <TableCell>{row.date}</TableCell>
      <TableCell>
        {row.ledgerType == "invoice" && row.price_in_cents > 0 ? "-" : ""}
        $
        {centsToDollars(row.price_in_cents)}
      </TableCell>
      <TableCell>
        {row.total < 0
          ? `(${centsToDollars(row.total)})`
          : centsToDollars(row.total)}
      </TableCell>
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
              let target = row.ledgerType == "invoice"
                ? `/invoices/${row.id}`
                : `/payments/${row.id}`;
              navigate(target);
            }}
          >
            {row.ledgerType == "invoice" ? <ReceiptIcon /> : <PaymentIcon />}
          </Link>
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default LedgerTableRow;
