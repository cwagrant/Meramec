import React from "react";
import {
  Autocomplete,
  Box,
  FormControlLabel,
  ListItem,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { gql, useQuery } from "@apollo/client";
import FormFields from "./FormFields";

const GET_CUSTOMERS = gql`
  query allCustomers {
    customers {
      id
      firstName
      lastName
      gateCode
      email
      formalName
    }
  }
`;

const SelectCustomer = ({ rentalAgreement, setRentalAgreement }) => {
  const { loading, error, data } = useQuery(GET_CUSTOMERS);
  const [options, setOptions] = React.useState([]);
  const [newCustomer, setNewCustomer] = React.useState(false);
  const [newCustomerAttr, setNewCustomerAttr] = React.useState(null);

  React.useEffect(() => {
    if (!loading && rentalAgreement?.customer) {
      const optionCustomer = options.find((element) =>
        element.id == rentalAgreement?.customer.id
      );
    }
  }, [options]);

  React.useEffect(() => {
    const customers = data?.customers.slice().sort((a, b) => {
      if (a.formalName === b.formalName) {
        return 0;
      }

      return a.formalName < b.formalName ? -1 : 1;
    });

    setOptions(customers || []);
  }, [data]);

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <FormControlLabel
          sx={{ m: 1 }}
          control={
            <Switch
              id="newCustomer"
              value={newCustomer}
              onChange={() => {
                setNewCustomer(!newCustomer);
              }}
            />
          }
          label="New Customer"
        />
      </Box>
      {newCustomer
        ? (
          <FormFields
            values={newCustomerAttr}
            onChange={(newValue) => {
              setNewCustomerAttr(newValue);
              setRentalAgreement({
                ...rentalAgreement,
                newCustomer: newCustomer,
                newCustomerAttr: newCustomerAttr,
              });
            }}
          />
        )
        : (
          <Autocomplete
            disablePortal
            id="customer"
            value={rentalAgreement?.customer || null}
            options={options}
            getOptionLabel={(option) => option.formalName}
            renderOption={(props, option, state) => {
              return (
                <ListItem
                  {...props}
                  component="li"
                  key={`${option.formalName} ${option.id}`}
                  sx={{ justifyContent: "space-between!important" }}
                >
                  <span>{option.formalName}</span>
                  <Typography variant="overline" sx={{ color: "#444" }}>
                    (ID: {option.id})
                  </Typography>
                </ListItem>
              );
            }}
            onChange={(event, newValue) => {
              setRentalAgreement({
                ...rentalAgreement,
                customer: newValue,
              });
            }}
            sx={{
              width: 1,
              pr: 2,
              "& .MuiAutocomplete-option": {
                display: "flex",
                justifyContent: "space-between",
              },
            }}
            renderInput={(params) => <TextField {...params} label="Customer" />}
            isOptionEqualToValue={(option, value) => {
              return option.id === value.id;
            }}
          />
        )}
    </>
  );
};

export default SelectCustomer;
