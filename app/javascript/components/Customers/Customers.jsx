import React from "react";
import { useCallback, useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
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
import * as paths from "../PathHelper";

const Records = ({ customers }) => {
  return customers.map(({ id, first_name, last_name }) => (
    <TableRow key={id}>
      <TableCell>{id}</TableCell>
      <TableCell>
        <Link component={RouterLink} to={"/customers/" + id}>
          {first_name} {last_name}
        </Link>
      </TableCell>
      <TableCell>
        <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
          <Link component={RouterLink} to={"/customers/" + id}>
            <LaunchIcon />
          </Link>
          <Link component={RouterLink} to={"/customers/" + id + "/edit"}>
            <EditIcon />
          </Link>
          <Link component={RouterLink} to={"/customers/" + id}>
            <DeleteIcon />
          </Link>
        </Box>
      </TableCell>
    </TableRow>
  ));
};

const Customers = () => {
  const [query, setQuery] = useState("");
  const axios = useAxios();
  const [data, setData] = React.useState();

  const changeHandler = (event) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    queryCustomers();
  }, [query]);

  const debouncedChangeHandler = useCallback(
    debounce(changeHandler, 300),
    [],
  );

  const queryCustomers = () => {
    axios
      .get(paths.API.CUSTOMERS(), {
        params: { search: query },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div key="customersList">
      <TextField
        sx={{ width: 1, maxWidth: "md" }}
        id="customer-search"
        label="Search for customers by name..."
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
      <TableContainer
        component={Paper}
        sx={{ maxWidth: "md" }}
        key="propertiesListTable"
      >
        <Table aria-label="customers listing">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              <Records key="customersListItems" customers={data} />}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Customers;
