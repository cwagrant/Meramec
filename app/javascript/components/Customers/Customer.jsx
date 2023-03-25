import React from "react";
import { useOutletContext } from "react-router-dom";
import { Box, Button, Paper } from "@mui/material";
import FormFields from "./FormFields";
import { Link as RouterLink } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";

const Customer = ({ customer }) => {
  const { customer: contextCustomer } = useOutletContext();
  let useCustomer = customer ? customer : contextCustomer;

  if (!useCustomer) return "Customer not found...";

  return (
    <Paper
      sx={{ display: "flex", flexDirection: "column", maxWidth: "sm", p: 1 }}
    >
      <FormFields customer={useCustomer} readOnly={true} />
      <Box sx={{ display: "flex", m: 1 }}>
        <Button
          component={RouterLink}
          to={"./edit"}
          variant="outlined"
          startIcon={<EditIcon />}
        >
          Edit
        </Button>
      </Box>
    </Paper>
  );
};

export default Customer;
