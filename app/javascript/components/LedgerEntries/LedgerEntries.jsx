import React from "react";
import { useCallback, useEffect, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import useAxios from "../useAxios";
import * as paths from "../PathHelper";
import { useSnackbar } from "notistack";
import LedgerEntryTableRow from "./LedgerEntryTableRow";
import EnhancedTable from "../EnhancedTable";
import { Box, Button, TextField } from "@mui/material";

const LedgerEntries = () => {
  const { agreementId } = useParams();
  const [data, setData] = useState();
  const { enqueueSnackbar } = useSnackbar();
  const axios = useAxios(enqueueSnackbar);

  React.useEffect(() => {
    axios
      .get(paths.API.LEDGER(), {
        params: { rental_agreement_id: agreementId },
      })
      .then((res) => {
        setData(res.data);
      });
  }, []);

  return (
    <div key="paymentsList">
      <Box sx={{ maxWidth: "lg" }}>
        <EnhancedTable
          rows={data}
          DefaultOrder="desc"
          DefaultOrderBy="date"
          TableHeaders={[
            { id: "date", numeric: false, label: "Date" },
            { id: "source_type", numeric: false, label: "Source" },
            { id: "amount", numeric: true, label: "Amount" },
            { id: "balance", numeric: true, label: "Balance" },
          ]}
          TableRow={LedgerEntryTableRow}
          TableProps={{ sx: { maxWidth: "lg", minWidth: 0 } }}
        />
      </Box>
    </div>
  );
};

export default LedgerEntries;
