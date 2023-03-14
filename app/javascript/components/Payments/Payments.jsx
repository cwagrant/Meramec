import React from "react";
import { useCallback, useEffect, useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";
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

const GET_PAYMENTS = gql`
  query allPayments($input: PaymentInput) { 
    payments(attributes: $input) {
      id
      date
      customer{
        id
        firstName
        lastName
      }
      rentalAgreementPayments{
        id
        rentalAgreement{
          id
          unit
        }
      }
    }
  }
`;

const Records = ({ payments }) => {
  return payments.map(({ id, customer, date }) => (
    <TableRow key={id}>
      <TableCell>{id}</TableCell>
      <TableCell>
        <Link component={RouterLink} to={"/payments/" + id}>
          {customer.firstName} {customer.lastName}
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
          <Link component={RouterLink} to={"/agreements/" + id}>
            <DeleteIcon />
          </Link>
        </Box>
      </TableCell>
    </TableRow>
  ));
};

const Payments = () => {
  const [query, setQuery] = useState("");
  const [searchPayments, { data }] = useLazyQuery(
    GET_PAYMENTS,
  );

  const changeHandler = (event) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    searchPayments({ variables: { input: { search: query } } });
  }, [data, query]);

  const debouncedChangeHandler = useCallback(
    debounce(changeHandler, 300),
    [],
  );

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
                  payments={data.payments}
                />
              )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Payments;
