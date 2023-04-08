import React from "react";
import PaymentForm from "./PaymentForm";
import useAxios from "../useAxios";
import * as paths from "../PathHelper";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const New = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const axios = useAxios(enqueueSnackbar);
  const [payment, setPayment] = React.useState({
    date: null,
    customer: null,
    discounts_in_cents: 0,
    fees_in_cents: 0,
    subtotal_in_cents: 0,
    total_in_cents: 0,
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(paths.API.PAYMENTS(), { payment: payment })
      .then((res) => {
        const id = res.data.id;
        enqueueSnackbar("Payment saved successfully", { variant: "success" });
        navigate(`/payments`);
      });
  };

  return <PaymentForm />;
};

export default New;
