import React from "react";
import { Autocomplete, TextField } from "@mui/material";
import { isEmpty } from "lodash";

import useAxios from "../useAxios";
import * as paths from "../PathHelper";

const SelectUnit = ({ property, onChange }) => {
  const axios = useAxios();
  const [propertyList, setPropertyList] = React.useState([]);

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

  return (
    <Autocomplete
      disablePortal
      options={propertyList}
      getOptionLabel={(option) => option.name}
      value={property}
      onChange={(event, newValue) => {
        onChange(newValue);
      }}
      sx={{ width: 1 }}
      renderInput={(params) => <TextField {...params} label="Property" />}
      isOptionEqualToValue={(option, value) => {
        return option?.id === value?.id;
      }}
    />
  );
};

export default SelectUnit;
