import React from "react";
import { useCallback, useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import useAxios from "../useAxios";
import * as paths from "../PathHelper";
import { debounce } from "lodash";
import { useSnackbar } from "notistack";
import EnhancedTable from "../EnhancedTable";
import RentalAgreementTableRow from "./RentalAgreementTableRow";
import SearchBar from "../SearchBar";

import { Box, Button, TextField } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";

const RentalAgreements = ({ customer }) => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState();
  const { enqueueSnackbar } = useSnackbar();
  const axios = useAxios(enqueueSnackbar);

  React.useEffect(() => {
    queryRentalAgreements();
  }, [customer]);

  const changeHandler = (event) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    queryRentalAgreements();
  }, [query]);

  const queryRentalAgreements = () => {
    params = {
      search: query,
    };

    if (customer) {
      params = { ...params, customer_id: customer.id };
    }
    axios
      .get(paths.API.RENTAL_AGREEMENTS(), { params: params })
      .then((res) => {
        setData(res.data);
      });
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
          { id: "unit.name", numeric: false, label: "Unit" },
          { id: "customer.formal_name", numeric: false, label: "Customer" },
          { id: "start_date", numeric: false, label: "Start Date" },
          { id: "end_date", numeric: false, label: "End Date" },
          { id: "null" },
        ]}
        TableRow={RentalAgreementTableRow}
        onDelete={deleteAgreement}
      />
    </Box>
  );
};

export default RentalAgreements;
