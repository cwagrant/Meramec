import React from "react";
import { useOutletContext } from "react-router-dom";
import { Box, Grid, Paper, Stack, Typography } from "@mui/material";

const Show = () => {
  const { rentalAgreement, setRentalAgreement } = useOutletContext();

  if (!rentalAgreement) return "Loading...";

  return (
    <Paper>
      <Box sx={{ p: 2, display: "flex" }}>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Stack spacing={0.5}>
              <Typography variant="subtitle2">name</Typography>
              <Typography>
                {rentalAgreement.name}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={2}>
            <Stack spacing={0.5}>
              <Typography variant="caption">email</Typography>
              <Typography variant="body1">
                {rentalAgreement.email}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={2}>
            <Stack spacing={0.5}>
              <Typography variant="caption">gate code</Typography>
              <Typography variant="body1">
                {rentalAgreement.gateCode}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default Show;
