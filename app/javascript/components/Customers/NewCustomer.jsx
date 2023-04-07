import React from "react";
import { Box, Button, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

import FormFields from "./CustomerFields";
import AddressFields from "../Addresses/AddressFields";
import useAxios from "../useAxios";
import * as paths from "../PathHelper";
import updateCustomer from "../reducer";

const NewCustomer = () => {
  const { enqueueSnackbar } = useSnackbar();
  const axios = useAxios(enqueueSnackbar);
  const navigate = useNavigate();
  const [customer, dispatch] = React.useReducer(updateCustomer, {
    company: "",
    first_name: "",
    last_name: "",
    gate_code: "",
    email: "",
    phone_number: "",
    address: {
      address_1: "",
      address_2: "",
      city: "",
      state_code: "",
      zipcode: "",
      country_code: "",
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(paths.API.CUSTOMERS(), { customer: customer })
      .then((res) => {
        const id = res.data.id;
        enqueueSnackbar("Customer created successfully", {
          variant: "success",
        });
        navigate(`/customers/${id}`);
      });
  };

  return (
    <Box
      component="form"
      id="customerForm"
      onSubmit={handleSubmit}
      sx={{
        width: 1,
        maxWidth: "md",
      }}
    >
      <FormFields
        customer={customer}
        dispatch={dispatch}
      />

      <Divider sx={{ mt: 2 }}>Address</Divider>
      <AddressFields
        address={customer.address}
        dispatch={dispatch}
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

export default NewCustomer;
