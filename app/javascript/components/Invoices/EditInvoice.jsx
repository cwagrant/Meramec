import React from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import useAxios from "../useAxios";
import { useSnackbar } from "notistack";
import * as paths from "../PathHelper";
import InvoiceForm from "./InvoiceForm";

const Edit = () => {
  const { invoiceId } = useParams();
  const { invoice, setInvoice } = useOutletContext();
  const { enqueueSnackbar } = useSnackbar();
  const axios = useAxios(enqueueSnackbar);
  const navigate = useNavigate();

  const handleSubmit = (event, invoice) => {
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

  return <InvoiceForm invoice={invoice} onSubmit={handleSubmit} mode="edit" />;
};

export default Edit;
