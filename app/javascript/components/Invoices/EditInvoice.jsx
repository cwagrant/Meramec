import React from "react";
import { Box, Button } from "@mui/material";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import FormFields from "./InvoiceFields";
import useAxios from "../useAxios";
import { useSnackbar } from "notistack";
import * as paths from "../PathHelper";

const Edit = () => {
  const { invoiceId } = useParams();
  const { invoice, setInvoice } = useOutletContext();
  const { enqueueSnackbar } = useSnackbar();
  const axios = useAxios(enqueueSnackbar);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .put(
        paths.API.INVOICES(invoiceId),
        { invoice: invoice },
      )
      .then((res) => {
        const id = res.data.id;
        setInvoice(res.data);
        enqueueSnackbar("Invoice updated successfully", {
          variant: "success",
        });
        navigate("/invoices/" + id);
      });
  };

  return (
    <Box sx={{ maxWidth: "md", p: 2 }} component="form" onSubmit={handleSubmit}>
      <FormFields
        invoice={invoice}
        onChange={(newValue) => {
          setInvoice(newValue);
        }}
      />

      <Box sx={{ display: "flex", mt: 2, gap: 2 }}>
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
            if (!window.confirm("Are you sure you wish to cancel?")) {
              return;
            }
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
