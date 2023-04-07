import React from "react";
import {
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { centsToDollars } from "../DataFormatHelpers";
import CircularProgress from "@mui/material/CircularProgress";

const RentalAgreementFields = (
  { rentalAgreement, dispatch, readOnly },
) => {
  if (!rentalAgreement) return <CircularProgress />;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">
          Rental Agreement #{rentalAgreement?.id}
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <DatePicker
          required
          id="rental_agreement_start_date"
          name="rental_agreement[start_date]"
          label="Start Date"
          sx={{ width: 1 }}
          value={dayjs.isDayjs(rentalAgreement.start_date)
            ? rentalAgreement.start_date
            : rentalAgreement.start_date
            ? dayjs(rentalAgreement.start_date)
            : null}
          onChange={(newValue) => {
            dispatch({ type: "start_date", value: newValue });
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <DatePicker
          id="rental_agreement_end_date"
          name="rental_agreement[end_date]"
          label="End Date"
          sx={{ width: 1 }}
          value={dayjs.isDayjs(rentalAgreement.end_date)
            ? rentalAgreement.end_date
            : rentalAgreement.end_date
            ? dayjs(rentalAgreement.end_date)
            : null}
          onChange={(newValue) => {
            dispatch({ type: "end_date", value: newValue });
          }}
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
              dispatch({
                type: "frequency_in_months",
                value: event.target.value,
              });
            }}
            readOnly={readOnly}
          >
            <MenuItem value="1">Monthly</MenuItem>
            <MenuItem value="3">Quarterly</MenuItem>
            <MenuItem value="6">Semiannual</MenuItem>
            <MenuItem value="12">Yearly</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <DatePicker
          label="Next Due Date"
          sx={{ width: 1 }}
          value={dayjs.isDayjs(rentalAgreement.next_due_date)
            ? rentalAgreement.next_due_date
            : rentalAgreement.next_due_date
            ? dayjs(rentalAgreement.next_due_date)
            : null}
          onChange={(newValue) => {
            dispatch({ type: "next_due_date", value: newValue });
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          type="number"
          value={rentalAgreement.price || ""}
          onChange={(event) => {
            dispatch({ type: "price", value: event.target.value });
            dispatch({
              type: "price_in_cents",
              value: centsToDollars(event.target.value),
            });
          }}
          readOnly={readOnly}
          sx={{ width: 1 }}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
      </Grid>
    </Grid>
  );
};

export default RentalAgreementFields;
