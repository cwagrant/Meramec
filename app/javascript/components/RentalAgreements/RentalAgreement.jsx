import React from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Box, Divider, Grid, Paper, Typography } from "@mui/material";

import UnitCard from "../Units/UnitCard";
import PropertyCard from "../Properties/PropertyCard";
import RentalAgreementCard from "./RentalAgreementCard";
import CustomerCard from "../Customers/CustomerCard";
import ControlButtons from "../ControlButtons";
import useAxios from "../useAxios";
import * as paths from "../PathHelper";

const Show = () => {
  const { rentalAgreement } = useOutletContext();
  const navigate = useNavigate();
  const axios = useAxios();

  if (!rentalAgreement) return "Loading...";

  const deleteAgreement = (id) => {
    if (
      !window.confirm("Are you sure you wish to delete this Rental Agreement?")
    ) return;

    axios
      .delete(paths.API.RENTAL_AGREEMENTS(id))
      .then((res) => {
        if (res) {
          navigate("/agreements");
        }
      });
  };

  return (
    <Box sx={{ maxWidth: "md" }}>
      <Grid container spacing={4} columnSpacing={2}>
        <Grid item xs={12}>
          <ControlButtons
            newUrl="/agreements/new"
            editUrl={`/agreements/${rentalAgreement.id}/edit`}
            deleteCallback={() => deleteAgreement(rentalAgreement.id)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ height: 1 }}>
            <Divider sx={{ p: 3, pb: 0 }}>Rental Agreement</Divider>
            <RentalAgreementCard rentalAgreement={rentalAgreement} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ height: 1 }}>
            <Divider sx={{ p: 3, pb: 0 }}>Customer</Divider>
            <CustomerCard customer={rentalAgreement.customer} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ height: 1 }}>
            <Divider sx={{ p: 3, pb: 0 }}>Property</Divider>
            <PropertyCard property={rentalAgreement.property} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ height: 1 }}>
            <Divider sx={{ p: 3, pb: 0 }}>Unit</Divider>
            <UnitCard unit={rentalAgreement.unit} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Show;
