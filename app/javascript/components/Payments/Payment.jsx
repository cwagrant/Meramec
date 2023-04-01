import React from "react";
import { useOutletContext } from "react-router-dom";
import { Box, Button, ButtonGroup } from "@mui/material";
import PaymentFields from "./PaymentFields";
import { Link as RouterLink } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import AddBoxIcon from "@mui/icons-material/AddBox";

const Payment = ({ payment }) => {
  const { payment: contextPayment } = useOutletContext();
  let usePayment = payment ? payment : contextPayment;

  if (!usePayment) return "payment not found...";

  return (
    <>
      <Box
        sx={{
          display: "flex",
          maxWidth: "md",
          justifyContent: "flex-end",
          m: 1,
          gap: 1,
        }}
      >
        <ButtonGroup variant="outlined">
          <Button
            component={RouterLink}
            to={"./edit"}
            startIcon={<EditIcon />}
          >
            Edit
          </Button>
          <Button
            component={RouterLink}
            to={"/payments/new"}
            startIcon={<AddBoxIcon />}
          >
            New
          </Button>
        </ButtonGroup>
      </Box>
      <Box
        sx={{
          width: 1,
          maxWidth: "md",
          "& .MuiFormControl-root": { m: 1, maxWidth: "md" },
        }}
      >
        <PaymentFields payment={usePayment} readOnly={true} />
      </Box>
    </>
  );
};

export default Payment;
