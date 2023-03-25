import React from "react";
import { useOutletContext } from "react-router-dom";
import { Box, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import { default as CustomerForm } from "../Customers/FormFields";
import { default as UnitForm } from "../Units/FormFields";

const Show = () => {
  const { rentalAgreement, setRentalAgreement } = useOutletContext();

  if (!rentalAgreement) return "Loading...";
  console.log("try", rentalAgreement);

  return (
    <Paper sx={{ maxWidth: "sm", p: 2 }}>
      <Typography variant="h4">
        Rental Agreement - #{rentalAgreement.id}
      </Typography>
      <Divider>Unit</Divider>
      <UnitForm unit={rentalAgreement.unit} readOnly={true} />
      <Divider>Customer</Divider>
      <CustomerForm customer={rentalAgreement.customer} readOnly={true} />
    </Paper>
  );
};

export default Show;
