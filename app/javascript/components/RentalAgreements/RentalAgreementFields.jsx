import React from "react";
import {
  Autocomplete,
  Box,
  Divider,
  FormControl,
  FormControlLabel,
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
  const [data, setData] = React.useState();
  const [newCustomer, setNewCustomer] = React.useState(false);
  const axios = useAxios();

  React.useEffect(() => {
    axios
      .get(paths.API.UNITS())
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  React.useEffect(() => {
    const units = data?.slice().sort((a, b) => {
      let x = a.occupied - b.occupied;

      if (x !== 0) {
        return x;
      }

      if (a.name === b.name) {
        return 0;
      }

      return a.name < b.name ? -1 : 1;
    });

    setUnitOptions(units || []);
  }, [data]);

  return (
    <>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        <Typography variant="h4">
          Rental Agreement #{rentalAgreement?.id}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            width: 1,
          }}
        >
          <DatePicker
            required
            id="rental_agreement_start_date"
            name="rental_agreement[start_date]"
            label="Start Date"
            sx={{ flexGrow: 1, flexBasis: { xs: "100%", sm: "40%" } }}
            value={dayjs.isDayjs(rentalAgreement.start_date)
              ? rentalAgreement.start_date
              : rentalAgreement.start_date
              ? dayjs(rentalAgreement.start_date)
              : null}
            onChange={(newValue) => {
              onChange({ ...rentalAgreement, start_date: newValue });
            }}
          />
          <DatePicker
            id="rental_agreement_end_date"
            name="rental_agreement[end_date]"
            label="End Date"
            sx={{ flexGrow: 1, flexBasis: { xs: "100%", sm: "40%" } }}
            value={dayjs.isDayjs(rentalAgreement.end_date)
              ? rentalAgreement.end_date
              : rentalAgreement.end_date
              ? dayjs(rentalAgreement.end_date)
              : null}
            onChange={(newValue) => {
              onChange({ ...rentalAgreement, end_date: newValue });
            }}
          />
          <FormControl
            sx={{ flexGrow: 1, flexBasis: "40%" }}
          >
            <InputLabel htmlFor="standard-adornment-amount">
              Amount
            </InputLabel>
            <OutlinedInput
              id="unit_price"
              name="unit[price]"
              label="Amount"
              type="number"
              value={rentalAgreement.price || ""}
              onChange={(event) => {
                onChange({ ...rentalAgreement, price: event.target.value });
              }}
              readOnly={readOnly}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
            />
          </FormControl>
          <DatePicker
            id="rental_agreement_next_due_date"
            name="rental_agreement[next_due_date]"
            label="Next Due Date"
            sx={{ flexGrow: 1, flexBasis: { xs: "100%", sm: "40%" } }}
            value={dayjs.isDayjs(rentalAgreement.next_due_date)
              ? rentalAgreement.next_due_date
              : rentalAgreement.next_due_date
              ? dayjs(rentalAgreement.next_due_date)
              : null}
            onChange={(newValue) => {
              onChange({ ...rentalAgreement, next_due_date: newValue });
            }}
          />
        </Box>
      </Box>

      <Divider>Unit</Divider>
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
        sx={{ width: 1, pr: 2 }}
        renderInput={(params) => <TextField {...params} label="Unit" />}
        isOptionEqualToValue={(option, value) => {
          return option?.id === value?.id;
        }}
      />

      <Divider>Customer</Divider>
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
    </>
  );
};

export default RentalAgreementFields;
/*
 * Want to add a checkbox for including/excluding rented units
 */
