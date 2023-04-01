import React from "react";
import { useCallback, useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { debounce } from "lodash";
import { Box, Button, TextField } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CustomerTableRow from "./CustomerTableRow";
import EnhancedTable from "../EnhancedTable";
import useAxios from "../useAxios";
import * as paths from "../PathHelper";
import { useSnackbar } from "notistack";

const Customers = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [query, setQuery] = useState("");
  const axios = useAxios(enqueueSnackbar);
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
      });
  };

  const deleteCustomer = (id) => {
    axios
      .delete(paths.API.CUSTOMERS(id))
      .then((res) => {
        if (res) {
          queryCustomers();
        }
      });
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
      <Box sx={{ maxWidth: "md" }}>
        <EnhancedTable
          rows={data}
          DefaultOrder="asc"
          DefaultOrderBy="formal_name"
          TableHeaders={[
            { id: "formal_name", numeric: false, label: "Name" },
            { id: "company", numeric: false, label: "Company" },
            { id: "phone_number", numeric: false, label: "Phone" },
            { id: null },
          ]}
          TableRow={CustomerTableRow}
          onDelete={deleteCustomer}
        />
      </Box>
    </div>
  );
};

export default Customers;
