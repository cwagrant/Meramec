import React from "react";
import { Autocomplete, ListItem, TextField, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import useAxios from "../useAxios";
import * as paths from "../PathHelper";

const SelectCustomer = (
  { customer, onChange, onLoad, readOnly, sx },
) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [options, setOptions] = React.useState([]);
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
    let startId = parseInt(searchParams.get("customer"));

    if (data && startId) {
      const optionCustomer = options.find((element) => element.id == startId);
      onLoad(optionCustomer);
    }
  }, [options, searchParams]);

  React.useEffect(() => {
    const customers = data?.slice().sort((a, b) => {
      if (a.formal_name === b.formal_name) {
        return 0;
      }

      return a.formal_name < b.formal_name ? -1 : 1;
    });
    setOptions(customers || []);
  }, [data]);

  return (
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
            <Typography variant="overline" sx={{ color: "#d6deeb" }}>
              (ID: {option.id})
            </Typography>
          </ListItem>
        );
      }}
      onChange={(event, newValue) => {
        onChange(newValue);
      }}
      sx={{
        ...sx,
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
  );
};

export default SelectCustomer;
