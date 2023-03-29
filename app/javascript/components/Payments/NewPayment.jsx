import React from "react";
import { Box, Button } from "@mui/material";
import FormFields from "./FormFields";
import useAxios from "../useAxios";
import * as paths from "../PathHelper";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

/* TODO:
 * Additionally we'll want to look at adding validations to different form
 * fields (required, etc.) as well as in models to try to preserve data
 * integerity as much as possible.
 *
 * Needed Forms/Data Changes
 * LedgerEntry: Need a basic form for Creating entries. Maybe add it to
 *   to the bottom of a RentalAgreement for viewing purposes?
 * Breadcrumbs: Payments
 * Buttons: Probably need to cleanup show page and add some links to edit
 *  something in it's show page.
 *
 * After that the true last stage will be figuring out how to set up a docker
 * container that I can then run this on on the homelab box.
 */

const New = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const axios = useAxios(enqueueSnackbar);
  const [payment, setPayment] = React.useState({
    date: null,
    customer: null,
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(paths.API.PAYMENTS(), document.querySelector("#paymentForm"))
      .then((res) => {
        const id = res.data.id;
        pushNotification("Payment saved", "success");
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
      <FormFields
        payment={payment}
        onChange={(newValue) => {
          setPayment(newValue);
        }}
      />

      <Box sx={{ display: "flex", m: 1 }}>
        <Button
          variant="outlined"
          type="submit"
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default New;
