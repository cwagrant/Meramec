import React from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FormFields from "./InvoiceFields";
import useAxios from "../useAxios";
import { useSnackbar } from "notistack";
import * as paths from "../PathHelper";

const Edit = () => {
  const { enqueueSnackbar } = useSnackbar();
  const axios = useAxios(enqueueSnackbar);
  const navigate = useNavigate();
  const [invoice, setInvoice] = React.useState({
    customer: "",
    date: "",
    state: "",
    subtotal_in_cents: "",
    total_in_cents: "",
    paid: false,
    invoice_items: [],
  });

  React.useEffect(() => {
    console.log(invoice);
  }, [invoice]);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(paths.API.INVOICES(), { invoice: invoice })
      .then((res) => {
        const id = res.data.id;
        enqueueSnackbar("Invoice created successfully", {
          variant: "success",
        });
        navigate(`/invoices/${id}`);
      });
  };

  return (
    <Box
      component="form"
      id="invoiceForm"
      onSubmit={handleSubmit}
      sx={{
        width: 1,
        maxWidth: "md",
      }}
    >
      <FormFields
        invoice={invoice}
        onChange={(newValue) => setInvoice(newValue)}
      />

      <Box sx={{ display: "flex", m: 1, gap: 2 }}>
        <Button
          variant="outlined"
          type="submit"
        >
          Submit
        </Button>
        <Button
          variant="outlined"
          type="button"
          onClick={(event) => {
            event.preventDefault();
            if (!window.confirm("Are you sure you wish to cancel?")) return;
            navigate("..");
          }}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default Edit;
