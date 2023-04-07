import React from "react";
import { Box, Button, Divider } from "@mui/material";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

import FormFields from "./CustomerFields";
import useAxios from "../useAxios";
import * as paths from "../PathHelper";
import updateCustomer from "../reducer";
import AddressFields from "../Addresses/AddressFields";
import { Address, Customer } from "../Models";

const EditCustomer = () => {
  const { customerId } = useParams();
  const { customer: sourceCustomer, setCustomer } = useOutletContext();
  const { enqueueSnackbar } = useSnackbar();
  const axios = useAxios(enqueueSnackbar);
  const navigate = useNavigate();

  const [customer, dispatch] = React.useReducer(updateCustomer, {
    ...Customer,
    address: { ...Address },
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .put(
        paths.API.CUSTOMERS(customerId),
        { customer: customer },
      )
      .then((res) => {
        const id = res.data.id;
        setCustomer(res.data);
        enqueueSnackbar("Customer updated successfully", {
          variant: "success",
        });
        navigate("/customers/" + id);
      });
  };

  React.useEffect(() => {
    if (sourceCustomer) {
      dispatch({ type: "initialize", value: sourceCustomer });
    }
  }, [sourceCustomer]);

  if (!customer) return;

  return (
    <Box sx={{ maxWidth: "md", p: 2 }} component="form" onSubmit={handleSubmit}>
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
            if (!window.confirm("Are you sure you wish to cancel?")) {
              return;
            }
            navigate("..");
          }}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default EditCustomer;
