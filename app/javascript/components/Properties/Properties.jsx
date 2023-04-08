import React from "react";
import { useCallback, useEffect, useState } from "react";
import { Link as RouterLink, useLoaderData } from "react-router-dom";
import { debounce } from "lodash";
import { Box, Button, TextField } from "@mui/material";
import { useSnackbar } from "notistack";

import SearchBar from "../SearchBar";
import useAxios from "../useAxios";
import EnhancedTable from "../EnhancedTable";
import PropertyTableRow from "./PropertyTableRow";
import * as paths from "../PathHelper";

const Properties = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState();
  const { enqueueSnackbar } = useSnackbar();
  const axios = useAxios(enqueueSnackbar);

  const changeHandler = (event) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    queryProperties();
  }, [query]);

  const deleteProperty = (id) => {
    if (
      !window.confirm("Are you sure you wish to delete this Rental Agreement?")
    ) return;
    axios
      .delete(`api/properties/${id}`)
      .then((res) => {
        if (res) {
          queryProperties();
        }
      });
  };

  const queryProperties = () => {
    axios
      .get(paths.API.PROPERTIES(), { params: { search: query } })
      .then((res) => {
        setData(res.data);
      });
  };

  return (
    <Box sx={{ maxWidth: "lg" }}>
      <SearchBar
        onChange={changeHandler}
        TextFieldProps={{ sx: { width: 1 } }}
        newUrl={"./new"}
      />
      <Box sx={{ maxWidth: "lg" }}>
        <EnhancedTable
          rows={data}
          DefaultOrder="asc"
          DefaultOrderBy="name"
          TableHeaders={[
            { id: "id", numeric: false, label: "ID" },
            { id: "name", numeric: false, label: "Property" },
            { id: null },
          ]}
          TableRow={PropertyTableRow}
          onDelete={deleteProperty}
        />
      </Box>
    </Box>
  );
};

export default Properties;
