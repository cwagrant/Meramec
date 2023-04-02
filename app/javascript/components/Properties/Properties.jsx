import React from "react";
import { useCallback, useEffect, useState } from "react";
import { Link as RouterLink, useLoaderData } from "react-router-dom";
import { debounce } from "lodash";
import {
  Box,
  Button,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import LaunchIcon from "@mui/icons-material/Launch";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import useAxios from "../useAxios";
import { useSnackbar } from "notistack";
import EnhancedTable from "../EnhancedTable";
import PropertyTableRow from "./PropertyTableRow";

const SEARCH_PROPERTIES_URL = "/api/properties";

const Records = ({ properties, deleteCallback }) => {
  return properties.map(({ id, name }) => (
    <TableRow key={id}>
      <TableCell>{id}</TableCell>
      <TableCell>
        <Link component={RouterLink} to={"/properties/" + id}>
          {name}
        </Link>
      </TableCell>
      <TableCell>
        <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
          <Link component={RouterLink} to={"/properties/" + id}>
            <LaunchIcon />
          </Link>
          <Link component={RouterLink} to={"/properties/" + id + "/edit"}>
            <EditIcon />
          </Link>
          <Link
            onClick={(event) => {
              event.preventDefault();
              deleteCallback(id);
            }}
          >
            <DeleteIcon />
          </Link>
        </Box>
      </TableCell>
    </TableRow>
  ));
};

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

  const debouncedChangeHandler = useCallback(
    debounce(changeHandler, 300),
    [],
  );

  const deleteProperty = (id) => {
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
      .get(SEARCH_PROPERTIES_URL, { params: { search: query } })
      .then((res) => {
        setData(res.data);
      });
  };

  return (
    <div key="propertiesList">
      <TextField
        sx={{ width: 1, maxWidth: "md" }}
        id="property-search"
        label="Search for properties by name..."
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
        <Box>
          <Button
            component={RouterLink}
            to={"./new"}
            variant="outlined"
            startIcon={<AddBoxIcon />}
          >
            New
          </Button>
        </Box>
      </Box>
      <Box sx={{ maxWidth: "md" }}>
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
    </div>
  );
};

export default Properties;
