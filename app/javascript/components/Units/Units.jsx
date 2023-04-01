import React from "react";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Collapse,
  IconButton,
  Link,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";
import useAxios from "../useAxios";
import { useSnackbar } from "notistack";
import * as paths from "../PathHelper";
import Unit from "./Unit";
import EnhancedTable from "../EnhancedTable";
import UnitTableRow from "./UnitTableRow";

import LaunchIcon from "@mui/icons-material/Launch";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AddBoxIcon from "@mui/icons-material/AddBox";

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

  const debouncedChangeHandler = useCallback(
    debounce(changeHandler, 300),
    [],
  );

  const deleteUnit = (id) => {
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
      <TextField
        sx={{ mb: 2, width: 1, maxWidth: "md" }}
        id="property-search"
        label="Search for units by name..."
        variant="filled"
        onChange={debouncedChangeHandler}
        type="text"
      />
      <Box
        sx={{
          my: 1,
          display: "flex",
          justifyContent: "flex-end",
          width: 1,
          maxWidth: "md",
        }}
      >
        <Button
          component={RouterLink}
          to={"./units/new"}
          variant="outlined"
          startIcon={<AddBoxIcon />}
        >
          New
        </Button>
      </Box>
      <Box sx={{ maxWidth: "md" }}>
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
