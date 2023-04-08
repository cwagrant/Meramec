import React from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Divider, Grid, Paper, Typography } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { isEmpty } from "lodash";

import ControlButtons from "../ControlButtons";
import InvoiceCard from "./InvoiceCard";
import CustomerCard from "../Customers/CustomerCard";
import RentalAgreementInvoiceRow from "../RentalAgreements/InvoiceTableRow";
import InvoiceAdjustmentTableRow from "../InvoiceAdjustments/InvoiceAdjustmentTableRow";
import { centsToDollars } from "../DataFormatHelpers";
import useAxios from "../useAxios";
import * as paths from "../PathHelper";

const Invoice = () => {
  const { invoice } = useOutletContext();
  const navigate = useNavigate();
  const axios = useAxios();

  const deleteInvoice = (id) => {
    if (
      !window.confirm("Are you sure you wish to delete this Invoice?")
    ) return;
    axios
      .delete(paths.API.INVOICES(id))
      .then((res) => {
        if (res) {
          navigate("/agreements");
        }
      });
  };

  if (!invoice) return "Invoice not found...";

  return (
    <Grid container spacing={2} sx={{ maxWidth: "md" }}>
      <Grid item xs={12}>
        <ControlButtons
          newUrl="../new"
          editUrl={`./edit`}
          deleteCallback={() => deleteInvoice(invoice.id)}
          printUrl={`${paths.API.INVOICES(invoice.id)}/print`}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper sx={{ height: 1 }}>
          <Divider sx={{ p: 3, pb: 0 }}>Invoice</Divider>
          <InvoiceCard invoice={invoice} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper sx={{ height: 1 }}>
          <Divider sx={{ p: 3, pb: 0 }}>Customer</Divider>
          <CustomerCard customer={invoice.customer} />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: "auto" }}>Description</TableCell>
                <TableCell sx={{ width: "75px" }}>Unit</TableCell>
                <TableCell sx={{ width: "75px" }}>Cost</TableCell>
                <TableCell sx={{ width: "75px" }} align="center">
                  Qty
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoice.invoice_items.map((row, index) => (
                <RentalAgreementInvoiceRow
                  readOnly
                  key={row.item.id}
                  row={row}
                  onChange={(key, newValue) => {
                    dispatch({
                      type: `invoice_items[${index}].${key}`,
                      value: newValue,
                    });
                  }}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      {!isEmpty(invoice.invoice_adjustments) && (
        <>
          <Grid item xs={0} md={6} />
          <Grid item xs={12} md={6}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: "75" }} />
                  <TableCell sx={{ width: "auto" }}>Description</TableCell>
                  <TableCell sx={{ width: "75px" }} align="right">
                    Amount
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoice.invoice_adjustments.map((adj, index) => (
                  <InvoiceAdjustmentTableRow
                    key={index}
                    row={adj}
                    onDelete={() => {
                      dispatch({
                        type: `invoice_adjustments[${index}]._destroy`,
                        value: 1,
                      });
                    }}
                  />
                ))}
              </TableBody>
            </Table>
          </Grid>
        </>
      )}
      <Grid item xs={0} md={9} />
      <Grid item xs={12} md={3}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="subtitle1">Sub-Total</Typography>
          </Grid>
          <Grid item xs={6} sx={{ textAlign: "right" }}>
            <Typography variant="subtitle1">
              ${centsToDollars(invoice.subtotal_in_cents || 0)}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={0} md={9} />
      <Grid item xs={12} md={3}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h6">Total</Typography>
          </Grid>
          <Grid item xs={6} sx={{ textAlign: "right" }}>
            <Typography variant="h6">
              ${centsToDollars(invoice.total_in_cents || 0)}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Invoice;
