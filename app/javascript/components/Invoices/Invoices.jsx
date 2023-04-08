import React from "react";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useSnackbar } from "notistack";

import InvoiceTableRow from "./InvoiceTableRow";
import EnhancedTable from "../EnhancedTable";
import useAxios from "../useAxios";
import * as paths from "../PathHelper";
import SearchBar from "../SearchBar";

const Invoices = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [query, setQuery] = useState("");
  const axios = useAxios(enqueueSnackbar);
  const [data, setData] = React.useState();

  const changeHandler = (event) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    queryInvoices();
  }, [query]);

  const queryInvoices = () => {
    axios
      .get(paths.API.INVOICES(), {
        params: { search: query },
      })
      .then((res) => {
        setData(res.data);
      });
  };

  const deleteInvoice = (id) => {
    if (
      !window.confirm("Are you sure you wish to delete this Invoice?")
    ) return;
    axios
      .delete(paths.API.INVOICES(id))
      .then((res) => {
        if (res) {
          queryInvoices();
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
        DefaultOrderBy="customer.formal_name"
        TableHeaders={[
          { id: "date", numeric: false, label: "Date" },
          { id: "customer.formal_name", numeric: false, label: "Name" },
          { id: "customer.company", numeric: false, label: "Company" },
          { id: "state", numeric: false, label: "State" },
          { id: null },
        ]}
        TableRow={InvoiceTableRow}
        onDelete={deleteInvoice}
      />
    </Box>
  );
};

export default Invoices;
