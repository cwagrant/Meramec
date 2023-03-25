import React from "react";
import { useOutletContext } from "react-router-dom";
import { Box, Grid, Paper, Stack, Typography } from "@mui/material";

const Customer = ({ customer }) => {
  const { customer: contextCustomer } = useOutletContext();
  let useCustomer = customer ? customer : contextCustomer;

  if (!useCustomer) return "Customer not found...";

  return (
    <Paper>
      <Box sx={{ p: 2, display: "flex" }}>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Stack spacing={0.5}>
              <Typography variant="subtitle2">name</Typography>
              <Typography>
                {useCustomer.last_name}, {useCustomer.first_name}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={2}>
            <Stack spacing={0.5}>
              <Typography variant="caption">email</Typography>
              <Typography variant="body1">
                {useCustomer.email}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={2}>
            <Stack spacing={0.5}>
              <Typography variant="caption">gate code</Typography>
              <Typography variant="body1">
                {useCustomer.gate_code}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default Customer;
