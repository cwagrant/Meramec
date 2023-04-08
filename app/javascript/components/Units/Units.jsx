import React from "react";
import { useCallback, useEffect, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";
import useAxios from "../useAxios";
import { useSnackbar } from "notistack";
import * as paths from "../PathHelper";
import EnhancedTable from "../EnhancedTable";
import UnitTableRow from "./UnitTableRow";
import SearchBar from "../SearchBar";

const Units = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState();
  const { propertyId } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const axios = useAxios(enqueueSnackbar);

  const changeHandler = (event) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    queryUnits();
  }, [query]);

  const deleteUnit = (id) => {
    if (
      !window.confirm("Are you sure you wish to delete this Unit?")
    ) return;
    axios
      .delete(paths.API.UNITS(id))
      .then((res) => {
        queryUnits();
      });
  };

  const queryUnits = () => {
    axios
      .get(paths.API.UNITS(), {
        params: { search: query, property: propertyId },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        enqueueSnackbar(
          "Looks like there was an error in finding the existing units",
          { variant: "error" },
        );
      });
  };

  return (
    <>
      <SearchBar
        onChange={changeHandler}
        TextFieldProps={{ sx: { width: 1, maxWidth: "lg" } }}
        newUrl={"./units/new"}
        editUrl={"./edit"}
      />
      <Box sx={{ maxWidth: "lg" }}>
        <EnhancedTable
          rows={data}
          DefaultOrder="asc"
          DefaultOrderBy="name"
          TableHeaders={[
            { id: "name", numeric: false, label: "Name" },
            { id: "type_of", numeric: false, label: "Type" },
            { id: "price_in_cents", numeric: false, label: "Price" },
            { id: "occupied", numeric: false, label: "Occupancy" },
            { id: null },
          ]}
          TableRow={UnitTableRow}
          onDelete={deleteUnit}
        />
      </Box>
    </>
  );
};

export default Units;
