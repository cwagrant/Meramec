import React from "react";
import { useOutletContext } from "react-router-dom";
import { Box, Button, Paper } from "@mui/material";
import PaymentFields from "./PaymentFields";
import { Link as RouterLink } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import AddBoxIcon from "@mui/icons-material/AddBox";

const Payment = ({ payment }) => {
  const { payment: contextPayment } = useOutletContext();
  let usePayment = payment ? payment : contextPayment;

  if (!usePayment) return "payment not found...";

  return (
    <Paper
      sx={{ display: "flex", flexDirection: "column", maxWidth: "sm", p: 1 }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end", m: 1, gap: 1 }}>
        <Button
          component={RouterLink}
          to={"./edit"}
          variant="outlined"
          startIcon={<EditIcon />}
        >
          Edit
        </Button>
        <Button
          component={RouterLink}
          to={"/payments/new"}
          variant="outlined"
          startIcon={<AddBoxIcon />}
        >
          New
        </Button>
      </Box>
      <PaymentFields payment={usePayment} readOnly={true} />
    </Paper>
  );
};

export default Payment;
