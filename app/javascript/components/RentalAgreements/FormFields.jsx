import React from "react";
import {
  Autocomplete,
  Box,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import SelectCustomer from "../Customers/SelectCustomer";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import useAxios from "../useAxios";
import * as paths from "../PathHelper";

const FormFields = ({ rentalAgreement, setRentalAgreement }) => {
  const [unitOptions, setUnitOptions] = React.useState([]);
  const [unit, setUnit] = React.useState(null);
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [customer, setCustomer] = React.useState();
  const [data, setData] = React.useState();
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
    if (data && rentalAgreement?.unit) {
      const optionUnit = unitOptions.find((element) =>
        element.id == rentalAgreement?.unit.id
      );

      if (optionUnit) {
        setUnit(optionUnit);
      }

      if (rentalAgreement?.customer) {
        setCustomer(rentalAgreement.customer);
      }
    }

    if (rentalAgreement) {
      setStartDate(dayjs(rentalAgreement.start_date));
      setEndDate(dayjs(rentalAgreement.end_date));
    }
  }, [rentalAgreement, unitOptions]);

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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            required
            id="rental_agreement_start_date"
            name="rental_agreement[start_date]"
            label="Start Date"
            sx={{ width: 1, m: 1, maxWidth: "sm" }}
            value={startDate}
            onChange={(newValue) => {
              setStartDate(newValue);
            }}
          />
          <DatePicker
            required
            id="rental_agreement_end_date"
            name="rental_agreement[end_date]"
            label="End Date"
            sx={{ width: 1, m: 1, maxWidth: "sm" }}
            value={endDate}
            onChange={(newValue) => {
              setEndDate(newValue);
            }}
          />
        </LocalizationProvider>
      </Box>

      <Divider>Unit</Divider>
      {unit && unit?.id &&
        (
          <input
            type="hidden"
            id="rental_agreement_unit_id"
            name="rental_agreement[unit_id]"
            value={unit?.id || 0}
          />
        )}
      <Autocomplete
        disablePortal
        id="unit_id"
        name="unit_id"
        options={unitOptions}
        groupBy={(option) => option.occupied ? "Taken" : "Available"}
        getOptionLabel={(option) => option.name}
        value={unit}
        onChange={(event, newValue) => {
          setUnit(newValue);
        }}
        sx={{ width: 1, pr: 2 }}
        renderInput={(params) => <TextField {...params} label="Unit" />}
        isOptionEqualToValue={(option, value) => {
          return option?.id === value?.id;
        }}
      />

      <Divider>Customer</Divider>
      {customer && customer?.id &&
        (
          <input
            type="hidden"
            id="rental_agreement_customer_id"
            name="rental_agreement[customer_id]"
            value={customer?.id || 0}
          />
        )}
      <SelectCustomer
        customer={customer}
        onChange={(newValue) => {
          setCustomer(newValue);
        }}
        allowNew={true}
      />
    </>
  );
};

export default FormFields;
/*
 * Want to add a checkbox for including/excluding rented units
 */
