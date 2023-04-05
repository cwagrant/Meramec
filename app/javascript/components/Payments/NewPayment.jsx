import React from "react";
import { Box, Button } from "@mui/material";
import PaymentFields from "./PaymentFields";
import useAxios from "../useAxios";
import * as paths from "../PathHelper";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

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
      <PaymentFields
        payment={payment}
        onChange={(newValue) => {
          setPayment(newValue);
        }}
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

export default New;
