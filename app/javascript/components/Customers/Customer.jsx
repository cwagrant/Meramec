import React from "react";
import { useOutletContext } from "react-router-dom";
import { Box, Button, Grid } from "@mui/material";
import FormFields from "./CustomerFields";
import { Link as RouterLink } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import AddBoxIcon from "@mui/icons-material/AddBox";
import RentalAgreements from "../RentalAgreements/RentalAgreements";

const Customer = ({ customer }) => {
  const { customer: contextCustomer } = useOutletContext();
  let useCustomer = customer ? customer : contextCustomer;

  if (!useCustomer) return "Customer not found...";

  return (
    <Grid container spacing={2} sx={{ maxWidth: "md" }}>
      <Grid item xs={12}>
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
      </Grid>

      <Grid item xs={12}>
        <FormFields customer={useCustomer} readOnly={true} />
      </Grid>

      <Grid item xs={12}>
        <RentalAgreements customer={useCustomer} />
      </Grid>
    </Grid>
  );
};

export default Customer;
