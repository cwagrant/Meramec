import React from "react";
import { DatePicker } from "@mui/x-date-pickers";
import {
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
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
import { centsToDollars } from "../DataFormatHelpers";
import SelectCustomer from "../Customers/SelectCustomer";

const PaymentFields = ({ payment, onChange, readOnly, lockCustomer }) => {
  const axios = useAxios();
  const [paid, setPaid] = React.useState("");

  React.useEffect(() => console.log(payment), [payment]);

  const selectCustomerHandler = (customer) => {
    if (!customer) {
      onChange({
        ...payment,
        customer: null,
        customer_id: null,
        subtotal_in_cents: 0,
        fees_in_cents: 0,
        discounts_in_cents: 0,
        total_in_cents: 0,
        invoices: [],
      });
      return;
    }

    axios
      .get(paths.API.INVOICES(), {
        params: {
          customer_id: customer.id,
          payment_id: payment?.id,
          not_paid: 1,
        },
      })
      .then((res) => {
        let invoices = res.data;

        for (let invoice of invoices) {
          invoice.include_in_payment = false;
        }

        onChange({
          ...payment,
          customer: customer,
          customer_id: customer?.id,
          subtotal_in_cents: 0,
          fees_in_cents: 0,
          discounts_in_cents: 0,
          total_in_cents: 0,
          invoices: invoices || [],
        });
      });
  };

  const invoiceClickHandler = (invoice) => {
    if (readOnly) return;

    let newPayment = { ...payment };
    newPayment = toggleIncludeInvoice(newPayment, invoice);
    newPayment = recalculateTotals(newPayment);

    onChange({ ...newPayment });
  };

  const toggleIncludeInvoice = (payment, invoice) => {
    if (!payment?.invoice_ids) {
      console.log("notfound");
      payment.invoice_ids = [invoice.id];
      return payment;
    }
    let index = payment.invoice_ids.indexOf(invoice.id);

    if (index === -1) {
      payment.invoice_ids.push(invoice.id);
    } else {
      payment.invoice_ids = payment.invoice_ids.filter((a) => a !== invoice.id);
    }

    return payment;
  };

  const filteredInvoices = (payment) => {
    return payment.invoices.filter((a) =>
      payment.invoice_ids.indexOf(a.id) !== -1
    );
  };

  const recalculateTotals = (payment) => {
    if (!payment?.invoices || !onChange) return;

    let discounts = 0;
    let fees = 0;

    let invoices = filteredInvoices(payment);

    let adjustments = invoices.map((invoice) => invoice.invoice_adjustments);

    adjustments = adjustments.flat();

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

    return {
      ...payment,
      discounts_in_cents: discounts,
      fees_in_cents: fees,
      subtotal_in_cents: subtotal,
      total_in_cents: total,
    };
  };

  if (!payment) return;

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <DatePicker
            readOnly={readOnly}
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
              onChange({
                ...payment,
                date: newValue,
              });
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <SelectCustomer
            readOnly={readOnly}
            customer={payment.customer}
            onChange={(newValue) => {
              selectCustomerHandler(newValue);

              document.activeElement.blur();
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl sx={{ width: 1 }}>
            <InputLabel id="payment-type-label">Status</InputLabel>
            <Select
              labelId="payment-type-label"
              label="Status"
              value={payment.payment_type || "cash"}
              onChange={(event) => {
                onChange({
                  ...payment,
                  payment_type: event.target.value,
                });
              }}
              readOnly={readOnly}
            >
              <MenuItem value="cash">Cash</MenuItem>
              <MenuItem value="check">Check</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Check #"
            value={payment.check_number || ""}
            onChange={(event) => {
              onChange({ ...payment, check_number: event.target.value });
            }}
            readOnly={readOnly}
            sx={{ width: 1 }}
            InputProps={{
              readOnly: readOnly,
            }}
          />
        </Grid>
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
                ? payment.invoices.map((invoice) => {
                  return (
                    <TableRow
                      hover
                      key={invoice.id}
                      onClick={(event) => invoiceClickHandler(invoice)}
                    >
                      <TableCell>
                        <Checkbox
                          color="primary"
                          checked={payment.invoice_ids?.indexOf(invoice.id) !==
                            -1}
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
      </Grid>
    </>
  );
};

export default PaymentFields;
