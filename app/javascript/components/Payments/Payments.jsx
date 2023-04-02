import React from "react";
import { useCallback, useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import useAxios from "../useAxios";
import * as paths from "../PathHelper";
import { useSnackbar } from "notistack";
import PaymentTableRow from "./PaymentTableRow";
import EnhancedTable from "../EnhancedTable";

import { debounce } from "lodash";
import { Box, Button, TextField } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";

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
      });
  };

  const deletePayment = (id) => {
    axios
      .delete(paths.API.PAYMENTS(id))
      .then((res) => {
        if (res) {
          queryPayments();
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
      <Box sx={{ maxWidth: "md" }}>
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
    </div>
  );
};

export default Payments;
