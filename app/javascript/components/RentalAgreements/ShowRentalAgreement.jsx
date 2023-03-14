import React from "react";
import { useOutletContext } from "react-router-dom";
import { Box, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import { default as CustomerForm } from "../Customers/FormFields";
import { default as UnitForm } from "../units/UnitFormFields";

const Show = () => {
  const { rentalAgreement, setRentalAgreement } = useOutletContext();

  if (!rentalAgreement) return "Loading...";
  console.log(rentalAgreement);

  return (
    <Paper sx={{ maxWidth: "sm", p: 2 }}>
      <Typography variant="h4">
        Rental Agreement - #{rentalAgreement.id}
      </Typography>
      <Divider>Unit</Divider>
      <UnitForm values={rentalAgreement.unit} readOnly={true} />
      <Divider>Customer</Divider>
      <CustomerForm values={rentalAgreement.customer} readOnly={true} />
    </Paper>
  );
};

export default Show;
