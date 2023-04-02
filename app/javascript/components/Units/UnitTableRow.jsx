import React from "react";
import { Box, Link, TableCell, TableRow } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import LaunchIcon from "@mui/icons-material/Launch";
import EditIcon from "@mui/icons-material/Edit";
import { centsToDollars } from "../DataFormatHelpers";

const UnitTableRow = ({ row, onDelete }) => {
  const navigate = useNavigate();

  return (
    <TableRow
      hover
      onClick={(event) =>
        navigate(`/properties/${row.property_id}/units/${row.id}`)}
      role="checkbox"
      tabIndex={-1}
      key={row.id}
      sx={{ cursor: "pointer" }}
    >
      <TableCell>{row.name}</TableCell>
      <TableCell>{row.type_of}</TableCell>
      <TableCell>{centsToDollars(row.price_in_cents)}</TableCell>
      <TableCell>{row.occupied ? "Filled" : "Open"}</TableCell>
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
              navigate(`/properties/${row.property_id}/units/${row.id}`);
            }}
          >
            <LaunchIcon />
          </Link>
          <Link
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              navigate(`/properties/${row.property_id}/units/${row.id}/edit`);
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
                  "Are you sure you wish to delete this unit?",
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

export default UnitTableRow;
