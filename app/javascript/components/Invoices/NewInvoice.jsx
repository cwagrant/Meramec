import React from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import useAxios from "../useAxios";
import * as paths from "../PathHelper";
import InvoiceForm from "./InvoiceForm";

const NewInvoice = () => {
  const { enqueueSnackbar } = useSnackbar();
  const axios = useAxios(enqueueSnackbar);
  const navigate = useNavigate();

  const handleSubmit = (event, invoice) => {
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

  return <InvoiceForm onSubmit={handleSubmit} />;
};

export default NewInvoice;
