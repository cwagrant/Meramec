import React from "react";
import { Box, Button } from "@mui/material";
import { useOutletContext, useParams } from "react-router-dom";
import FormFields from "./FormFields";
import { dollarsToCents } from "../DataFormatHelpers";
import useAxios from "../useAxios";
import * as paths from "../PathHelper";

const New = () => {
  const axios = useAxios();
  const [payment, setPayment] = React.useState({
    date: null,
    customer: null,
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(paths.API.PAYMENTS(), document.querySelector("#paymentForm"))
      .then((res) => {
        console.log(res);
      })
      .catch((error) => console.log(error.response.data));
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

//TODO we want to show something that gives us th name of the unit,
// the type of unit, the price, the address, additional details, and
// eventually the current renter and possibly even additional details
// about them or such.
//
// Possibly even doing an inline form but I think not.
