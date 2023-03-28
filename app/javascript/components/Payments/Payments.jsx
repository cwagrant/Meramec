import React from "react";
import { useCallback, useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import useAxios from "../useAxios";
import * as paths from "../PathHelper";
import useNotifications from "../useNotifications";

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

const Records = ({ payments, deleteCallback }) => {
  return payments.map(({ id, customer, date }) => (
    <TableRow key={id}>
      <TableCell>{id}</TableCell>
      <TableCell>
        <Link component={RouterLink} to={"/payments/" + id}>
          {customer.formal_name}
        </Link>
      </TableCell>
      <TableCell>{date}</TableCell>
      <TableCell>
        <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
          <Link component={RouterLink} to={"/agreements/" + id}>
            <LaunchIcon />
          </Link>
          <Link component={RouterLink} to={"/agreements/" + id + "/edit"}>
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

const Payments = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState();
  const { pushNotification } = useNotifications();
  const axios = useAxios();

  const changeHandler = (event) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    queryPayments();
  }, [query]);

  const debouncedChangeHandler = useCallback(
    debounce(changeHandler, 300),
    [],
  );

  const queryPayments = () => {
    axios
      .get(paths.API.PAYMENTS(), {
        params: { search: query },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => console.log(error.response.data));
  };

  const deletePayment = (id) => {
    axios
      .delete(paths.API.PAYMENTS(id))
      .then((res) => {
        if (res) {
          queryPayments();
        }
      })
      .catch((error) => {
        console.log(error);
        console.log(error?.response?.data?.errors);
        const errors = error?.response?.data?.errors;

        if (errors) {
          errors.map((err) => {
            pushNotification(`${err} (ID: ${id})`, "error");
          });
        }
      });
  };

  return (
    <div key="paymentsList">
      <TextField
        sx={{ width: 1, maxWidth: "md" }}
        id="payment-search"
        label="Search for payments by name..."
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
        <Table aria-label="payments listing">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              (
                <Records
                  key="paymentsListItems"
                  payments={data}
                  deleteCallback={deletePayment}
                />
              )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Payments;
