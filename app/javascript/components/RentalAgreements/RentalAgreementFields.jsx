import React from "react";
import {
  Autocomplete,
  Box,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import SelectCustomer from "../Customers/SelectCustomer";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import useAxios from "../useAxios";
import * as paths from "../PathHelper";
import { centsToDollars } from "../DataFormatHelpers";
import CustomerFields from "../Customers/CustomerFields";

const RentalAgreementFields = ({ rentalAgreement, onChange, readOnly }) => {
  const [unitOptions, setUnitOptions] = React.useState([]);
  const [propertyList, setPropertyList] = React.useState([]);
  const [property, setProperty] = React.useState(null);
  const [newCustomer, setNewCustomer] = React.useState(false);
  const [price, setPrice] = React.useState("");
  const axios = useAxios();

  React.useEffect(() => {
    axios
      .get(paths.API.PROPERTIES())
      .then((res) => {
        const data = res.data?.slice().sort((a, b) => {
          if (a.name === b.name) return 0;

          a.name < b.name ? -1 : 1;
        });
        setPropertyList(data);
      })
      .catch((error) => console.log(error));
  }, []);

  React.useEffect(() => {
    if (property) return;

    if (
      rentalAgreement && rentalAgreement?.unit && rentalAgreement.unit?.property
    ) {
      setProperty(rentalAgreement.unit.property);
    }
  }, [rentalAgreement]);

  React.useEffect(() => {
    if (!property) return;
    axios
      .get(paths.API.UNITS(), { params: { property: property.id } })
      .then((res) => {
        const units = res.data?.slice().sort((a, b) => {
          let x = a.occupied - b.occupied;

          if (x !== 0) {
            return x;
          }

          if (a.name === b.name) {
            return 0;
          }

          return a.name < b.name ? -1 : 1;
        });
        setUnitOptions(units);
      })
      .catch((error) => console.log(error));
  }, [property]);

  React.useEffect(() => {
    if (rentalAgreement?.price_in_cents) {
      setPrice(centsToDollars(rentalAgreement.price_in_cents));
    }
  }, [rentalAgreement?.price_in_cents]);

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
            onChange({ ...rentalAgreement, start_date: newValue });
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
            onChange({ ...rentalAgreement, end_date: newValue });
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          type="number"
          value={price}
          onChange={(event) => {
            setPrice(event.target.value);
            onChange({ ...rentalAgreement, price: event.target.value });
          }}
          readOnly={readOnly}
          sx={{ width: 1 }}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
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
            onChange({ ...rentalAgreement, next_due_date: newValue });
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Divider>Unit</Divider>
      </Grid>
      <Grid item xs={12}>
        <Autocomplete
          disablePortal
          options={propertyList}
          getOptionLabel={(option) => option.name}
          value={property}
          onChange={(event, newValue) => {
            setProperty(newValue);
            onChange({
              ...rentalAgreement,
              unit_id: null,
              unit: null,
            });
          }}
          sx={{ width: 1 }}
          renderInput={(params) => <TextField {...params} label="Property" />}
          isOptionEqualToValue={(option, value) => {
            return option?.id === value?.id;
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Autocomplete
          disablePortal
          id="unit_id"
          name="unit_id"
          options={unitOptions}
          groupBy={(option) => option.occupied ? "Taken" : "Available"}
          getOptionLabel={(option) => option.name}
          value={rentalAgreement.unit || null}
          onChange={(event, newValue) => {
            onChange({
              ...rentalAgreement,
              unit_id: newValue?.id,
              unit: newValue,
              price: centsToDollars(newValue.price_in_cents),
            });
          }}
          sx={{ width: 1 }}
          renderInput={(params) => <TextField {...params} label="Unit" />}
          isOptionEqualToValue={(option, value) => {
            return option?.id === value?.id;
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Divider>Customer</Divider>
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <FormControlLabel
            sx={{ m: 1 }}
            control={
              <Switch
                value={newCustomer}
                onChange={() => {
                  if (newCustomer) {
                    onChange({ ...rentalAgreement, customer: null });
                  } else {
                    onChange({
                      ...rentalAgreement,
                      customer: {
                        first_name: "",
                        last_name: "",
                        company: "",
                        email: "",
                        phone_number: "",
                        gate_code: "",
                      },
                    });
                  }
                  setNewCustomer(!newCustomer);
                }}
              />
            }
            label="New Customer"
          />
        </Box>
      </Grid>
      <Grid item xs={12}>
        {newCustomer &&
          (
            <CustomerFields
              customer={rentalAgreement.customer}
              onChange={(newValue) =>
                onChange({ ...rentalAgreement, customer: newValue })}
            />
          )}
        {!newCustomer &&
          (
            <SelectCustomer
              customer={rentalAgreement.customer}
              onChange={(newValue) => {
                onChange({
                  ...rentalAgreement,
                  customer: newValue,
                  customer_id: newValue?.id,
                });
              }}
            />
          )}
      </Grid>
    </Grid>
  );
};

export default RentalAgreementFields;
