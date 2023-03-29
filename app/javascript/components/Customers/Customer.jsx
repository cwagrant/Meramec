import React from "react";
import { useOutletContext } from "react-router-dom";
import { Box, Button, Paper } from "@mui/material";
import FormFields from "./CustomerFields";
import { Link as RouterLink } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import AddBoxIcon from "@mui/icons-material/AddBox";

const Customer = ({ customer }) => {
  const { customer: contextCustomer } = useOutletContext();
  let useCustomer = customer ? customer : contextCustomer;

  if (!useCustomer) return "Customer not found...";

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
          to={"/customers/new"}
          variant="outlined"
          startIcon={<AddBoxIcon />}
        >
          New
        </Button>
      </Box>
      <FormFields customer={useCustomer} readOnly={true} />
    </Paper>
  );
};

export default Customer;
