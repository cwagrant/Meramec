import React from "react";
import {
  Autocomplete,
  Box,
  FormControlLabel,
  Input,
  Paper,
  Switch,
  TextField,
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

const SelectCustomer = (props) => {
  const { loading, error, data } = useQuery(GET_CUSTOMERS);
  const [options, setOptions] = React.useState([]);
  const [newCustomer, setNewCustomer] = React.useState(false);
  const [customer, setCustomer] = React.useState(null);

  React.useEffect(() => {
    if (!loading && props.rentalAgreement?.customer) {
      const optionCustomer = options.find((element) =>
        element.id == props.rentalAgreement?.customer.id
      );

      setCustomer(optionCustomer);
    }
    // if (props.values?.id) {
    //   setCustomer({
    //     label: props.values?.formalName,
    //     id: props.values?.id,
    //   });
    // } else {
    //   setCustomer(null);
    // }
  }, [props.rentalAgreement, options]);

  React.useEffect(() => {
    if (customer) {
      let { label, ...customerInfo } = customer;
      props.setRentalAgreement({
        ...props.rentalAgreement,
        customer: customerInfo,
      });
    }
  }, [customer]);

  React.useEffect(() => {
    const customers = data?.customers.map((customer) => {
      if (customer?.id) {
        return {
          ...customer,
          "label": customer.formalName,
        };
      }
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
      {newCustomer ? <FormFields setCustomer={setCustomer} /> : (
        <Autocomplete
          disablePortal
          id="customer"
          value={customer}
          options={options}
          onChange={(event, newValue) => {
            props.setRentalAgreement({
              ...props.rentalAgreement,
              customer: newValue,
            });
          }}
          sx={{ width: 1, pr: 2 }}
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
