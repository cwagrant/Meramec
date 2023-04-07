import React from "react";
import { Autocomplete, TextField } from "@mui/material";
import { isEmpty } from "lodash";

import useAxios from "../useAxios";
import * as paths from "../PathHelper";

const SelectUnit = ({ unit, onChange, property }) => {
  const axios = useAxios();
  const [unitOptions, setUnitOptions] = React.useState([]);

  const fetchUnits = (property) => {
    axios
      .get(paths.API.UNITS(), { params: { property: property } })
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
  };

  React.useEffect(() => {
    fetchUnits();
  }, []);

  React.useEffect(() => {
    if (!isEmpty(property)) {
      fetchUnits(property?.id);
    }
  }, [property]);

  return (
    <Autocomplete
      disablePortal
      id="unit_id"
      name="unit_id"
      options={unitOptions}
      groupBy={(option) => option.occupied ? "Taken" : "Available"}
      getOptionLabel={(option) => option.name}
      value={unit || null}
      onChange={(event, newValue) => {
        onChange(newValue);
      }}
      sx={{ width: 1 }}
      renderInput={(params) => <TextField {...params} label="Unit" />}
      isOptionEqualToValue={(option, value) => {
        return option?.id === value?.id;
      }}
    />
  );
};

export default SelectUnit;
