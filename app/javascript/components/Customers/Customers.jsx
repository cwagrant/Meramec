import React from "react";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useSnackbar } from "notistack";

import CustomerTableRow from "./CustomerTableRow";
import EnhancedTable from "../EnhancedTable";
import useAxios from "../useAxios";
import * as paths from "../PathHelper";
import SearchBar from "../SearchBar";

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
    if (
      !window.confirm("Are you sure you wish to delete this Customer?")
    ) return;
    axios
      .delete(paths.API.CUSTOMERS(id))
      .then((res) => {
        if (res) {
          queryCustomers();
        }
      });
  };

  return (
    <Box sx={{ maxWidth: "lg" }}>
      <SearchBar
        onChange={changeHandler}
        TextFieldProps={{ sx: { width: 1 } }}
        newUrl={"./new"}
      />
      <EnhancedTable
        rows={data}
        DefaultOrder="asc"
        DefaultOrderBy="formal_name"
        TableKey="Customers"
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
  );
};

export default Customers;
