import React from "react";
import {
  Autocomplete,
  Box,
  FormControlLabel,
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
      formalName
    }
  }
`;

const SelectCustomer = (props) => {
  const { loading, error, data } = useQuery(GET_CUSTOMERS);
  const [options, setOptions] = React.useState([]);
  const [newCustomer, setNewCustomer] = React.useState(false);
  const [customer, setCustomer] = React.useState({ label: "", id: "" });

  React.useEffect(() => {
    // setFirstName(props.values?.firstName || "");
    // setLastName(props.values?.lastName || "");
    // setEmail(props.value?.email || "");
    // setGateCode(props.value?.gateCode || "");
    setCustomer({ label: props.values?.formalName, id: props.values?.id });
  }, [props.values]);

  React.useEffect(() => {
    const customers = data?.customers.map((customer) => {
      return {
        "label": customer.formalName || "",
        "id": customer.id || "",
      };
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
              value={newCustomer}
              onChange={() => {
                setNewCustomer(!newCustomer);
              }}
            />
          }
          label="New Customer"
        />
      </Box>
      {newCustomer ? <FormFields /> : (
        <Autocomplete
          disablePortal
          id="customer"
          // value={customer}
          options={options}
          sx={{ width: 1, pr: 2 }}
          renderInput={(params) => <TextField {...params} label="Customer" />}
          isOptionEqualToValue={(option, value) => {
            option?.id === value?.id;
          }}
        />
      )}
    </>
  );
};

export default SelectCustomer;
