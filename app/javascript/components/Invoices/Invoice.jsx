import React from "react";
import { useOutletContext } from "react-router-dom";
import { Box, Button, Grid } from "@mui/material";
import FormFields from "./InvoiceFields";
import { Link as RouterLink } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import AddBoxIcon from "@mui/icons-material/AddBox";
import RentalAgreements from "../RentalAgreements/RentalAgreements";

const Invoice = ({ invoice }) => {
  const { invoice: contextInvoice } = useOutletContext();
  let useInvoice = invoice ? invoice : contextInvoice;

  if (!useInvoice) return "Invoice not found...";

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
            to={"/invoices/new"}
            variant="outlined"
            startIcon={<AddBoxIcon />}
          >
            New
          </Button>
        </Box>
      </Grid>

      <Grid item xs={12}>
        <FormFields invoice={useInvoice} readOnly={true} />
      </Grid>
    </Grid>
  );
};

export default Invoice;
