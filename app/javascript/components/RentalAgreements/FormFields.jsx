import React from "react";
import {
  Autocomplete,
  Box,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { gql, useQuery } from "@apollo/client";
import SelectCustomer from "../Customers/SelectCustomer";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const GET_UNITS = gql`
  query allUnits {
    units {
      id
      name
      typeOf
      occupied
    }
  }
`;

/* Probably going to do this where we'll have a
 * property drop down of all properties - maybe
 * have a checkbox to filter it down to only open properties (or vice versa)
 *
 * Then we'll have another dropdown for Customer which
 * will be accompanied by a button to create a customer that
 * will load the user fields into the form. If you use that
 * we'll pass it in to the input to create the user when we
 * create the agreement.
 *
 * Eventually we'll need terms and other things but for now this
 * should suffice.
 *
 * Probably make the selects individual components in their respective folders?
 * */

const FormFields = (props) => {
  const { loading, error, data } = useQuery(GET_UNITS);
  const [unitOptions, setUnitOptions] = React.useState([]);
  // const [includeOccupiedUnits, setIncludeOccupiedUnits] = React.useState(true);
  const [unit, setUnit] = React.useState(null);
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");

  React.useEffect(() => {
    if (!loading && props.rentalAgreement?.unit) {
      const optionUnit = unitOptions.find((element) =>
        element.id == props.rentalAgreement?.unit.id
      );

      if (optionUnit) {
        setUnit(optionUnit);
      }
    }

    if (!loading && props.rentalAgreement) {
      setStartDate(dayjs(props.rentalAgreement.startDate));
      setEndDate(dayjs(props.rentalAgreement.endDate));
    }
  }, [props.rentalAgreement, unitOptions]);

  React.useEffect(() => {
    if (unit) {
      let { label, ...selectedUnit } = unit;
      props.setRentalAgreement({
        ...props.rentalAgreement,
        unit: selectedUnit,
        startDate: startDate,
        endDate: endDate,
      });
    }
  }, [unit, endDate, startDate]);

  React.useEffect(() => {
    const units = data?.units.slice().sort((a, b) => {
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
          Rental Agreement #{props.rentalAgreement?.id}
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            required
            id="startDate"
            name="startDate"
            label="Start Date"
            sx={{ width: 1, m: 1, maxWidth: "sm" }}
            value={startDate}
            onChange={(newValue) => {
              setStartDate(newValue);
            }}
          />
          <DatePicker
            required
            id="endDate"
            name="endDate"
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
      <Autocomplete
        disablePortal
        id="unit"
        options={unitOptions}
        groupBy={(option) => option.occupied ? "Taken" : "Available"}
        getOptionLabel={(option) => option.name}
        value={unit}
        onChange={(event, newValue) => {
          props.setRentalAgreement({
            ...props.rentalAgreement,
            unit: newValue,
          });
        }}
        sx={{ width: 1, pr: 2 }}
        renderInput={(params) => <TextField {...params} label="Unit" />}
        isOptionEqualToValue={(option, value) => {
          return option?.id === value?.id;
        }}
      />

      <Divider>Customer</Divider>
      <SelectCustomer
        rentalAgreement={props.rentalAgreement}
        setRentalAgreement={props.setRentalAgreement}
      />
    </>
  );
};

export default FormFields;
/*
 * Want to add a checkbox for including/excluding rented units
 */
