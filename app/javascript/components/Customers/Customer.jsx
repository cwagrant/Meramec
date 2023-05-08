import React from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Grid, Paper } from "@mui/material";

import PaginatedTable from "../PaginatedTable";
import LedgerTableRow from "../Ledgers/LedgerTableRow";
import RentalAgreements from "../RentalAgreements/RentalAgreements";
import CustomerCard from "../Customers/CustomerCard";
import ControlButtons from "../ControlButtons";
import useAxios from "../useAxios";
import * as paths from "../PathHelper";

const Customer = () => {
  const { customer } = useOutletContext();
  const navigate = useNavigate();
  const axios = useAxios();
  const [data, setData] = React.useState();

  const deleteCustomer = (id) => {
    if (
      !window.confirm("Are you sure you wish to delete this Customer?")
    ) return;
    axios
      .delete(paths.API.CUSTOMERS(id))
      .then((res) => {
        if (res) {
          navigate("/customers");
        }
      });
  };

  React.useEffect(() => {
    const payments = customer?.payments || [];
    const invoices = customer?.invoices || [];
    let temp = [];

    for (const payment of payments) {
      temp.push({
        ledgerType: "payment",
        id: payment.id,
        date: payment.date,
        price_in_cents: payment.paid_in_cents,
        created_at: payment.created_at,
      });
    }

    for (const invoice of invoices) {
      temp.push({
        ledgerType: "invoice",
        id: invoice.id,
        date: invoice.date,
        price_in_cents: invoice.total_in_cents,
        created_at: invoice.created_at,
      });
    }

    temp = temp.sort((a, b) => {
      if (a.date == b.date) {
        if (a.created_at == b.created_at) {
          return 0;
        } else {
          return a.created_at > b.created_at ? 1 : -1;
        }
      }
      return a.date > b.date ? 1 : -1;
    });

    let ledger = [];
    let running_total = 0;
    for (row of temp) {
      if (row.ledgerType == "payment") {
        running_total = running_total + row.price_in_cents;
      } else {
        running_total = running_total - row.price_in_cents;
      }

      ledger.push({
        ...row,
        total: running_total,
      });
    }

    ledger.reverse();

    setData(ledger);
  }, [customer]);

  if (!customer) return "Customer not found...";

  return (
    <Grid container spacing={2} sx={{ maxWidth: "md" }}>
      <Grid item xs={12}>
        <ControlButtons
          newUrl="../new"
          editUrl={`./edit`}
          deleteCallback={() => deleteCustomer(customer.id)}
        />
      </Grid>

      <Grid item xs={12}>
        <Paper>
          <CustomerCard customer={customer} />
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <RentalAgreements customer={customer} hideSearch />
      </Grid>

      <Grid item xs={12}>
        <PaginatedTable
          rows={data}
          TableHeaders={[
            { id: "date", numeric: false, label: "Date" },
            { id: "price_in_cents", numeric: false, label: "Amount" },
            { id: "total", numeric: false, label: "Total" },
            { id: null },
          ]}
          TableRow={LedgerTableRow}
        />
      </Grid>
    </Grid>
  );
};

export default Customer;
