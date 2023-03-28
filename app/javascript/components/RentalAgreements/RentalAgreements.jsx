import React from "react";
import { useCallback, useEffect, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import useAxios from "../useAxios";
import * as paths from "../PathHelper";
import { debounce } from "lodash";
import useNotifications from "../useNotifications";

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

const Records = ({ rentalAgreements, deleteCallback }) => {
  return rentalAgreements.map(({ id, customer, unit }) => (
    <TableRow key={id}>
      <TableCell>{unit.name}</TableCell>
      <TableCell>
        <Link component={RouterLink} to={"/agreements/" + id}>
          {customer.formal_name}
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

const RentalAgreements = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState();
  const axios = useAxios();
  const { pushNotification } = useNotifications();

  const changeHandler = (event) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    queryRentalAgreements();
  }, [query]);

  const queryRentalAgreements = () => {
    axios
      .get(paths.API.RENTAL_AGREEMENTS(), {
        params: { search: query },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => console.log(error.response.data));
  };

  const debouncedChangeHandler = useCallback(
    debounce(changeHandler, 300),
    [],
  );

  const deleteAgreement = (id) => {
    axios
      .delete(paths.API.RENTAL_AGREEMENTS(id))
      .then((res) => {
        if (res) {
          queryRentalAgreements();
        }
      })
      .catch((error) => {
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
              <TableCell>Unit</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              (
                <Records
                  key="rentalAgreementsListItems"
                  rentalAgreements={data}
                  deleteCallback={deleteAgreement}
                />
              )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default RentalAgreements;
