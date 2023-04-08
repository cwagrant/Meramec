import React from "react";
import { useEffect, useState } from "react";
import { Box, Paper } from "@mui/material";
import { useSnackbar } from "notistack";
import CircularProgress from "@mui/material/CircularProgress";

import useAxios from "../useAxios";
import * as paths from "../PathHelper";
import PaymentTableRow from "./PaymentTableRow";
import SearchBar from "../SearchBar";
import EnhancedTable from "../EnhancedTable";

const Payments = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState();
  const { enqueueSnackbar } = useSnackbar();
  const axios = useAxios(enqueueSnackbar);

  const changeHandler = (event) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    queryPayments();
  }, [query]);

  const queryPayments = () => {
    axios
      .get(paths.API.PAYMENTS(), {
        params: { search: query },
      })
      .then((res) => {
        setData(res.data);
      });
  };

  const deletePayment = (id) => {
    if (
      !window.confirm("Are you sure you wish to delete this Payment?")
    ) return;
    axios
      .delete(paths.API.PAYMENTS(id))
      .then((res) => {
        if (res) {
          queryPayments();
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
      <Box>
        <EnhancedTable
          rows={data}
          DefaultOrder="desc"
          DefaultOrderBy="date"
          TableHeaders={[
            { id: "date", numeric: false, label: "Date" },
            { id: "customer.formal_name", numeric: false, label: "Name" },
            { id: "customer.company", numeric: false, label: "Company" },
            { id: null },
          ]}
          TableRow={PaymentTableRow}
          onDelete={deletePayment}
        />
      </Box>
    </Box>
  );
};

export default Payments;
