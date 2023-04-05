import React from "react";
import { Link as RouterLink, useOutletContext } from "react-router-dom";
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { default as CustomerForm } from "../Customers/CustomerFields";
import { default as UnitForm } from "../Units/UnitFields";
import { centsToDollars } from "../DataFormatHelpers";
import EditIcon from "@mui/icons-material/Edit";
import AddBoxIcon from "@mui/icons-material/AddBox";

const Show = () => {
  const { rentalAgreement, setRentalAgreement } = useOutletContext();

  if (!rentalAgreement) return "Loading...";

  return (
    <Box sx={{ maxWidth: "md", p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Rental Agreement - #{rentalAgreement.id}
          </Typography>
        </Grid>
        <Grid item xs={6} sx={{ textAlign: "right" }}>
          <ButtonGroup variant="outlined" sx={{ mt: 2 }}>
            <Button
              component={RouterLink}
              to={"./edit"}
              startIcon={<EditIcon />}
            >
              Edit
            </Button>
            <Button
              component={RouterLink}
              to={"../new"}
              startIcon={<AddBoxIcon />}
            >
              New
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Start Date"
            value={rentalAgreement.start_date || "Missing"}
            readOnly={true}
            sx={{ width: 1 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="End Date"
            value={rentalAgreement.end_date || "Active"}
            readOnly={true}
            sx={{ width: 1 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl sx={{ width: 1 }}>
            <InputLabel id="frequency-label">Frequency In Months</InputLabel>
            <Select
              labelId="frequency-label"
              label="Frequency In Months"
              value={rentalAgreement.frequency_in_months || "1"}
              onChange={(event) => {
                onChange({
                  ...rentalAgreement,
                  frequency_in_months: event.target.value,
                });
              }}
              readOnly={true}
            >
              <MenuItem value="1">Monthly</MenuItem>
              <MenuItem value="3">Quarterly</MenuItem>
              <MenuItem value="6">Semiannual</MenuItem>
              <MenuItem value="12">Yearly</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Next Due Date"
            value={rentalAgreement.next_due_date || "Missing"}
            readOnly={true}
            sx={{ width: 1 }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Amount"
            value={centsToDollars(rentalAgreement.price_in_cents) ||
              "Missing"}
            sx={{ width: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
              readOnly: true,
            }}
          />
        </Grid>

        <Grid item xs={12} sx={{ pl: 0 }}>
          <Divider>Unit</Divider>
          <UnitForm unit={rentalAgreement.unit} readOnly={true} hidePrice />
        </Grid>

        <Grid item xs={12}>
          <Divider>Customer</Divider>
          <CustomerForm customer={rentalAgreement.customer} readOnly={true} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Show;
