import React from "react";
import PaymentForm from "./PaymentForm";
import useAxios from "../useAxios";
import * as paths from "../PathHelper";
import { useSnackbar } from "notistack";
import { useLocation, useNavigate } from "react-router-dom";

const New = () => {
  const navigate = useNavigate();
  const location = useLocation();
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

  const handleSubmit = (event, payment) => {
    event.preventDefault();

    axios
      .post(paths.API.PAYMENTS(), { payment: payment })
      .then((res) => {
        const id = res.data.id;
        enqueueSnackbar("Payment saved successfully", { variant: "success" });
        if (location.key == "default") {
          navigate("..");
        } else {
          navigate(-1);
        }
      });
  };

  return <PaymentForm onSubmit={handleSubmit} />;
};

export default New;
