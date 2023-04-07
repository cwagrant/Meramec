import React from "react";
import { useOutletContext } from "react-router-dom";
import { Box, Divider, Grid } from "@mui/material";
import UnitCard from "../Units/UnitCard";
import PropertyCard from "../Properties/PropertyCard";
import RentalAgreementCard from "./RentalAgreementCard";
import CustomerCard from "../Customers/CustomerCard";

const Show = () => {
  const { rentalAgreement } = useOutletContext();

  if (!rentalAgreement) return "Loading...";

  return (
    <Box sx={{ maxWidth: "md", p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Divider>Rental Agreement</Divider>
          <RentalAgreementCard rentalAgreement={rentalAgreement} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Divider>Customer</Divider>
          <CustomerCard customer={rentalAgreement.customer} />
        </Grid>

        <Grid item xs={12}>
          <Grid container item spacing={2}>
            <Grid item xs={12} md={6}>
              <Divider>Property</Divider>
              <PropertyCard property={rentalAgreement.property} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Divider>Unit</Divider>
              <UnitCard unit={rentalAgreement.unit} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Show;
