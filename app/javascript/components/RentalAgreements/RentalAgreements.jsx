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

const GET_RENTAL_AGREEMENTS = gql`
  query allRentalAgreements($input: RentalAgreementInput) { 
    rentalAgreements(attributes: $input) {
      id
      customer{
        id
        firstName
        lastName
      }
      unit{
        id
        name
      }
    }
  }
`;

const Records = ({ rentalAgreements }) => {
  return rentalAgreements.map(({ id, customer, property }) => (
    <TableRow key={id}>
      <TableCell>{id}</TableCell>
      <TableCell>
        <Link component={RouterLink} to={"/rentalAgreements/" + id}>
          {customer.firstName} {customer.lastName}
        </Link>
      </TableCell>
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

const RentalAgreements = () => {
  const [query, setQuery] = useState("");
  const [searchRentalAgreements, { data }] = useLazyQuery(
    GET_RENTAL_AGREEMENTS,
  );

  const changeHandler = (event) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    searchRentalAgreements({ variables: { input: { search: query } } });
  }, [data, query]);

  const debouncedChangeHandler = useCallback(
    debounce(changeHandler, 300),
    [],
  );

  return (
    <div key="rentalAgreementsList">
      <TextField
        sx={{ width: 1, maxWidth: "md" }}
        id="rentalAgreement-search"
        label="Search for rentalAgreements by name..."
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
        <Table aria-label="rentalAgreements listing">
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
                  key="rentalAgreementsListItems"
                  rentalAgreements={data.rentalAgreements}
                />
              )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default RentalAgreements;
