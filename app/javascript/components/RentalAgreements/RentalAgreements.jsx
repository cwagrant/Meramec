import React from "react";
import { useCallback, useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import useAxios from "../useAxios";
import * as paths from "../PathHelper";
import { debounce } from "lodash";
import { useSnackbar } from "notistack";
import EnhancedTable from "../EnhancedTable";
import RentalAgreementTableRow from "./RentalAgreementTableRow";

import { Box, Button, TextField } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";

const RentalAgreements = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState();
  const { enqueueSnackbar } = useSnackbar();
  const axios = useAxios(enqueueSnackbar);

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
      <Box sx={{ maxWidth: "md" }}>
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
    </div>
  );
};

export default RentalAgreements;
/* I think passing in a TableRow might be best as it lets us be very specific
 * about what happens in the table row while not having to have things like
 * DataActions or DataKeys. Instead we just pass in a row that will tell it
 * what to do, then we can pass whatever TableHeaders we need to match up to that.
 *
 * It'll be pretty big, but it'll also help avoid complexity down the line.
 */
