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
import FormFields from "./CustomerFields";
import useAxios from "../useAxios";
import * as paths from "../PathHelper";

const SelectCustomer = ({ customer, onChange, allowNew, readOnly }) => {
  const [options, setOptions] = React.useState([]);
  const [newCustomer, setNewCustomer] = React.useState(false);
  const [newCustomerAttr, setNewCustomerAttr] = React.useState(null);
  const [data, setData] = React.useState();
  const axios = useAxios();

  React.useEffect(() => {
    axios
      .get(paths.API.CUSTOMERS())
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  React.useEffect(() => {
    if (data && customer) {
      const optionCustomer = options.find((element) =>
        element.id == customer.id
      );
    }
  }, [options]);

  React.useEffect(() => {
    const customers = data?.slice().sort((a, b) => {
      if (a.formal_name === b.formal_name) {
        return 0;
      }

      return a.formal_name < b.formal_name ? -1 : 1;
    });

    setOptions(customers || []);
  }, [data]);

  const changeHandler = (newCustomerValue) => {
    if (onChange) {
      if (newCustomerValue) {
        onChange({
          ...newCustomerValue,
          newCustomer: newCustomer,
        });
      } else {
        onChange(null);
      }
    }
  };

  return (
    <>
      {allowNew &&
        (
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <FormControlLabel
              sx={{ m: 1 }}
              control={
                <Switch
                  id="newCustomer"
                  value={newCustomer}
                  onChange={() => {
                    if (newCustomer) {
                      changeHandler(null);
                    }
                    setNewCustomer(!newCustomer);
                  }}
                />
              }
              label="New Customer"
            />
          </Box>
        )}
      {newCustomer ? <FormFields values={newCustomerAttr} /> : (
        <Autocomplete
          readOnly={readOnly}
          disablePortal
          id="customer"
          name="customer"
          value={customer || null}
          options={options}
          getOptionLabel={(option) => option.formal_name}
          renderOption={(props, option, state) => {
            return (
              <ListItem
                {...props}
                component="li"
                key={`${option.formal_name} ${option.id}`}
                sx={{ justifyContent: "space-between!important" }}
              >
                <span>{option.formal_name}</span>
                <Typography variant="overline" sx={{ color: "#444" }}>
                  (ID: {option.id})
                </Typography>
              </ListItem>
            );
          }}
          onChange={(event, newValue) => {
            changeHandler(newValue);
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
