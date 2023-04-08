import React from "react";
import PaymentForm from "./PaymentForm";
import useAxios from "../useAxios";
import * as paths from "../PathHelper";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const EditPayment = () => {
  const { paymentId } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const axios = useAxios(enqueueSnackbar);
  const { payment, setPayment } = useOutletContext();

  const handleSubmit = (event, payment) => {
    event.preventDefault();

    axios
      .put(paths.API.PAYMENTS(paymentId), { payment: payment })
      .then((res) => {
        enqueueSnackbar("Payment saved successfully", { variant: "success" });
        setPayment(res.data);
        navigate(`/payments/${paymentId}`);
      });
  };

  return <PaymentForm payment={payment} onSubmit={handleSubmit} mode="edit" />;
};

export default EditPayment;
