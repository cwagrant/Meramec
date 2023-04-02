import React from "react";
import { Box, Button } from "@mui/material";
import PaymentFields from "./PaymentFields";
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

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .put(paths.API.PAYMENTS(paymentId), { payment: payment })
      .then((res) => {
        enqueueSnackbar("Payment saved successfully", { variant: "success" });
        setPayment(res.data);
        navigate(`/payments/${paymentId}`);
      });
  };

  return (
    <Box
      id="paymentForm"
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: 1,
        maxWidth: "md",
        "& .MuiFormControl-root": { m: 1, maxWidth: "md" },
      }}
    >
      {payment &&
        (
          <PaymentFields
            lockCustomer
            payment={payment}
            onChange={(newValue) => {
              setPayment(newValue);
            }}
          />
        )}

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

export default EditPayment;
