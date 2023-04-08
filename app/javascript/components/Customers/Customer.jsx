import React from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Grid, Paper } from "@mui/material";

import RentalAgreements from "../RentalAgreements/RentalAgreements";
import CustomerCard from "../Customers/CustomerCard";
import ControlButtons from "../ControlButtons";
import useAxios from "../useAxios";
import * as paths from "../PathHelper";

const Customer = () => {
  const { customer } = useOutletContext();
  const navigate = useNavigate();
  const axios = useAxios();

  if (!customer) return "Customer not found...";

  const deleteCustomer = (id) => {
    if (
      !window.confirm("Are you sure you wish to delete this Customer?")
    ) return;
    axios
      .delete(paths.API.CUSTOMERS(id))
      .then((res) => {
        if (res) {
          navigate("/customers");
        }
      });
  };

  return (
    <Grid container spacing={2} sx={{ maxWidth: "md" }}>
      <Grid item xs={12}>
        <ControlButtons
          newUrl="../new"
          editUrl={`./edit`}
          deleteCallback={() => deleteCustomer(customer.id)}
        />
      </Grid>

      <Grid item xs={12}>
        <Paper>
          <CustomerCard customer={customer} />
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <RentalAgreements customer={customer} hideSearch />
      </Grid>
    </Grid>
  );
};

export default Customer;
