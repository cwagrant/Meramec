import React from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { useSnackbar } from "notistack";
import { compact } from "lodash";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import useAxios from "../useAxios";
import * as paths from "../PathHelper";
import dayjs from "dayjs";
import { centsToDollars, dollarsToCents } from "../DataFormatHelpers";
import SelectCustomer from "../Customers/SelectCustomer";
import simpleReducer from "../reducer";
import { Payment } from "../Models";

const PaymentForm = (
  { payment: loadedPayment, onSubmit, mode },
) => {
  const { enqueueSnackbar } = useSnackbar();
  const axios = useAxios(enqueueSnackbar);
  const [payment, dispatch] = React.useReducer(simpleReducer, {
    ...Payment,
    customer: null,
    invoices: [],
  });

  const handleSubmit = (event) => {
    onSubmit(event, payment);
  };

  React.useEffect(() => {
    if (loadedPayment) return;
    dispatch({ type: "invoice_ids", value: [] });

    if (!payment.customer) return;

    axios
      .get(paths.API.INVOICES(), {
        params: {
          customer_id: payment.customer.id,
          payment_id: payment?.id,
          not_paid: 1,
        },
      })
      .then((res) => {
        let invoices = res.data || [];

        console.log("invoices", invoices);

        dispatch({
          type: "initialize",
          value: {
            ...payment,
            invoices: invoices,
            subtotal_in_cents: 0,
            fees_in_cents: 0,
            discounts_in_cents: 0,
            total_in_cents: 0,
            invoice_ids: [],
          },
        });
      });
  }, [payment.customer]);

  const invoiceClickHandler = (invoice, invoiceIndex) => {
    const index = payment.invoice_ids.indexOf(invoice.id);

    if (index === -1) {
      dispatch({
        type: "invoice_ids",
        value: [...payment.invoice_ids, invoice.id],
      });
    } else {
      dispatch({
        type: "invoice_ids",
        value: payment.invoice_ids.filter((a) => a !== invoice.id),
      });
    }
  };

  React.useEffect(() => {
    let discounts = 0;
    let fees = 0;

    let invoices = payment.invoices.filter((a) =>
      payment.invoice_ids.indexOf(a.id) !== -1
    );
    let adjustments = invoices.map((invoice) => invoice.invoice_adjustments);
    adjustments = compact(adjustments);

    for (let adjustment of adjustments) {
      if (adjustment.type_of == "fee") {
        fees = fees + adjustment.price_in_cents;
      } else {
        discounts = discounts + adjustment.price_in_cents;
      }
    }

    let subtotal = invoices.reduce(
      (acc, invoice) => acc + invoice.subtotal_in_cents,
      0,
    );

    let total = invoices.reduce(
      (acc, invoice) => acc + invoice.total_in_cents,
      0,
    );

    dispatch({
      type: "initialize",
      value: {
        discounts_in_cents: discounts,
        fees_in_cents: fees,
        subtotal_in_cents: subtotal,
        total_in_cents: total,
      },
    });
  }, [JSON.stringify(payment.invoice_ids)]);

  React.useEffect(() => {
    if (loadedPayment) {
      dispatch({ type: "initialize", value: loadedPayment });
    }
  }, [loadedPayment]);

  if (!payment) return;

  return (
    <Box
      component="form"
      id="invoiceForm"
      onSubmit={handleSubmit}
      sx={{
        width: 1,
        maxWidth: "md",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <DatePicker
            required
            id="payment_date"
            name="payment[date]"
            label="Date"
            sx={{ width: 1 }}
            value={dayjs.isDayjs(payment.date)
              ? payment.date
              : payment.date
              ? dayjs(payment.date)
              : null}
            onChange={(newValue) => {
              dispatch({ type: "date", value: newValue });
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <SelectCustomer
            readOnly={mode == "edit"}
            customer={payment.customer}
            onChange={(newValue) => {
              dispatch({ type: "customer", value: newValue });
              dispatch({ type: "customer_id", value: newValue?.id });
              dispatch({ type: "invoice_ids", value: [] });

              document.activeElement.blur();
            }}
          />
        </Grid>
        <Grid item xs={6} md={payment.payment_type == "check" ? 4 : 6}>
          <FormControl sx={{ width: 1 }}>
            <InputLabel id="payment-type-label">Payment Type</InputLabel>
            <Select
              labelId="payment-type-label"
              label="Payment Type"
              value={payment.payment_type || "cash"}
              onChange={(event) => {
                dispatch({ type: "payment_type", value: event.target.value });
              }}
            >
              <MenuItem value="cash">Cash</MenuItem>
              <MenuItem value="check">Check</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} md={payment.payment_type == "check" ? 4 : 6}>
          <TextField
            required
            label="Payment Amount"
            sx={{ width: 1 }}
            value={payment.price}
            onChange={(event) => {
              dispatch({
                type: "paid_in_cents",
                value: dollarsToCents(event.target.value),
              });
              dispatch({ type: "paid", value: event.target.value });
            }}
          />
        </Grid>
        {payment.payment_type == "check" &&
          (
            <Grid item xs={12} md={4}>
              <TextField
                label="Check #"
                value={payment.check_number || ""}
                onChange={(event) => {
                  dispatch({ type: "check_number", value: event.target.value });
                }}
                sx={{ width: 1 }}
              />
            </Grid>
          )}
        <Grid item xs={12}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Invoice Date</TableCell>
                <TableCell>Invoice #</TableCell>
                <TableCell align="right">Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payment?.invoices
                ? payment.invoices.map((invoice, index) => {
                  return (
                    <TableRow
                      hover
                      key={invoice.id}
                      onClick={(event) => {
                        invoiceClickHandler(invoice, index);
                      }}
                    >
                      <TableCell>
                        <Checkbox
                          color="primary"
                          checked={payment.invoice_ids
                            ? payment.invoice_ids.indexOf(invoice.id) !==
                              -1
                            : false}
                        />
                      </TableCell>
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
        <Grid item xs={12} md={3}>
          <Grid container spacing={2}>
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
        <Grid item xs={12}>
          <Box sx={{ display: "flex", m: 1, gap: 2 }}>
            <Button
              variant="outlined"
              type="submit"
            >
              Submit
            </Button>
            <Button
              variant="outlined"
              type="button"
              onClick={(event) => {
                event.preventDefault();
                if (!window.confirm("Are you sure you wish to cancel?")) return;
                navigate("..");
              }}
            >
              Cancel
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PaymentForm;
