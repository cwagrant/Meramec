import React from "react";
import { Box, Link, TableCell, TableRow } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import LaunchIcon from "@mui/icons-material/Launch";
import EditIcon from "@mui/icons-material/Edit";

const RentalAgreementTableRow = ({ row: rentalAgreement, onDelete }) => {
  const navigate = useNavigate();

  return (
    <TableRow
      hover
      onClick={(event) => navigate(`/agreements/${rentalAgreement.id}`)}
      role="checkbox"
      tabIndex={-1}
      key={rentalAgreement.id}
      sx={{ cursor: "pointer" }}
    >
      <TableCell>{rentalAgreement.unit.name}</TableCell>
      <TableCell>{rentalAgreement.customer.formal_name}</TableCell>
      <TableCell>{rentalAgreement.start_date}</TableCell>
      <TableCell>{rentalAgreement.end_date}</TableCell>
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
              navigate(`/agreements/${rentalAgreement.id}`);
            }}
          >
            <LaunchIcon />
          </Link>
          <Link
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              navigate(`/agreements/${rentalAgreement.id}/edit`);
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
                  "Are you sure you wish to delete this rental agreement?",
                )
              ) return;
              onDelete(rentalAgreement.id);
            }}
          >
            <DeleteIcon />
          </Link>
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default RentalAgreementTableRow;
