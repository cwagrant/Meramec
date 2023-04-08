import React from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Box, Grid, Paper, Typography } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

import PaymentCard from "./PaymentCard";
import ControlButtons from "../ControlButtons";
import useAxios from "../useAxios";
import * as paths from "../PathHelper";
import { centsToDollars } from "../DataFormatHelpers";

const Payment = () => {
  const { payment } = useOutletContext();
  const navigate = useNavigate();
  const axios = useAxios();

  if (!payment) return "payment not found...";

  const deletePayment = (id) => {
    if (
      !window.confirm("Are you sure you wish to delete this Payment?")
    ) return;
    axios
      .delete(paths.API.PAYMENTS(id))
      .then((res) => {
        if (res) {
          navigate("/payments");
        }
      });
  };

  return (
    <>
      <Box sx={{ maxWidth: "md" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ControlButtons
              newUrl="../new"
              editUrl={`./edit`}
              deleteCallback={() => deletePayment(payment.id)}
              printUrl={`${paths.API.PAYMENTS(payment.id)}/print`}
            />
          </Grid>
          <Grid item xs={12}>
            <Paper>
              <PaymentCard payment={payment} />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Invoice Date</TableCell>
                  <TableCell>Invoice #</TableCell>
                  <TableCell align="right">Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {payment?.invoices
                  ? payment.invoices.map((invoice) => {
                    return (
                      <TableRow
                        key={invoice.id}
                      >
                        <TableCell>{invoice.date}</TableCell>
                        <TableCell>
                          {String(invoice.id).padStart(6, "0")}
                        </TableCell>
                        <TableCell align="right">
                          {centsToDollars(invoice.total_in_cents)}
                        </TableCell>
                      </TableRow>
                    );
                  })
                  : null}
              </TableBody>
            </Table>
          </Grid>
          <Grid item xs={0} md={9} />
          <Grid item container spacing={2} xs={12} md={3}>
            <Grid item xs={6}>
              <Typography variant="h6">Subtotal</Typography>
            </Grid>
            <Grid item xs={6} sx={{ textAlign: "right" }}>
              <Typography variant="h6">
                ${centsToDollars(payment.subtotal_in_cents || 0)}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="h6">Fees</Typography>
            </Grid>
            <Grid item xs={6} sx={{ textAlign: "right" }}>
              <Typography variant="h6">
                ${centsToDollars(payment.fees_in_cents || 0)}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="h6">Discounts</Typography>
            </Grid>
            <Grid item xs={6} sx={{ textAlign: "right" }}>
              <Typography variant="h6">
                ${centsToDollars(payment.discounts_in_cents || 0)}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="h6">Total</Typography>
            </Grid>
            <Grid item xs={6} sx={{ textAlign: "right" }}>
              <Typography variant="h6">
                ${centsToDollars(payment.total_in_cents || 0)}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Payment;
