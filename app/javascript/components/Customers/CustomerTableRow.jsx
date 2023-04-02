import React from "react";
import { Box, Link, TableCell, TableRow } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import LaunchIcon from "@mui/icons-material/Launch";
import EditIcon from "@mui/icons-material/Edit";

const CustomerTableRow = ({ row, onDelete }) => {
  const navigate = useNavigate();

  return (
    <TableRow
      hover
      onClick={(event) => navigate(`/customers/${row.id}`)}
      role="checkbox"
      tabIndex={-1}
      key={row.id}
      sx={{ cursor: "pointer" }}
    >
      <TableCell>{row.formal_name}</TableCell>
      <TableCell>{row.company}</TableCell>
      <TableCell>{row.phone_number}</TableCell>
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
              navigate(`/customers/${row.id}`);
            }}
          >
            <LaunchIcon />
          </Link>
          <Link
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              navigate(`/customers/${row.id}/edit`);
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
                  "Are you sure you wish to delete this customer?",
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

export default CustomerTableRow;
