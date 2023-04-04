import React from "react";
import { DatePicker } from "@mui/x-date-pickers";
import {
  Box,
  FormControl,
  Grid,
  InputAdornment,
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
  const [price, setPrice] = React.useState("");
  const [data, setData] = React.useState("");
  const [total, setTotal] = React.useState("");

  const getCustomerInvoices = (customerId) => {
    axios
      .get(paths.API.INVOICES(), {
        params: { customer_id: customerId, not_paid: 1 },
      })
      .then((res) => {
        setData(res.data);
      });
  };

  const removeInvoice = (id) => {
    if (!onChange) return;

    let remainingInvoices = payment.invoices.filter((
      adjustment,
    ) => adjustment.id != id);

    onChange({
      ...payment,
      invoices: [
        ...remainingInvoices,
      ],
    });
  };

  React.useEffect(() => {
    if (payment?.price_in_cents) {
      setPrice(centsToDollars(payment.price_in_cents));
    }
  }, [payment?.price_in_cents]);

  // React.useEffect(() => {
  //   let customerId = payment?.customer_id || payment?.customer?.id;
  //   if (customerId) {
  //     axios
  //       .get(paths.API.CUSTOMERS(customerId))
  //       .then((res) => {
  //         if (!onChange) return;
  //         onChange({ ...payment, customer: res.data });
  //       })
  //       .catch((error) => console.log(error));
  //   }
  // }, [payment.customer_id]);

  React.useEffect(() => {
    if (!payment?.invoices || !onChange) return;

    let total = payment.invoices.reduce(
      (acc, invoice) => acc + invoice.total_in_cents,
      0,
    );

    onChange({ ...payment, price_in_cents: total });
  }, [payment?.invoices]);

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
              if (newValue) {
                getCustomerInvoices(newValue.id);
              } else {
                setData([]);
              }
              onChange({
                ...payment,
                customer: newValue,
                customer_id: newValue?.id,
                invoices: [],
              });
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
        {!readOnly &&
          (
            <>
              <Grid item xs={12}>
                <Paper>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Invoice Date</TableCell>
                        <TableCell align="center">Invoice #</TableCell>
                        <TableCell align="right">Total</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data &&
                        data.map((invoice) => {
                          return (
                            <TableRow
                              key={invoice.id}
                              onClick={() => {
                                let invoices = payment?.invoices
                                  ? [...payment.invoices]
                                  : [];

                                onChange({
                                  ...payment,
                                  invoices: [...invoices, invoice],
                                });
                              }}
                              sx={{ cursor: "pointer" }}
                            >
                              <TableCell>{invoice.date}</TableCell>
                              <TableCell align="center">
                                {String(invoice.id).padStart(6, "0")}
                              </TableCell>
                              <TableCell align="right">
                                {centsToDollars(invoice.total_in_cents)}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </Paper>
              </Grid>
              <Grid item xs={12} sx={{ textAlign: "center" }}>
                <Typography>
                  Click invoices in the box above to add them.
                </Typography>
              </Grid>
            </>
          )}
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
              {payment.invoices &&
                payment.invoices.map((invoice) => {
                  return (
                    <TableRow
                      key={invoice.id}
                      onClick={() => {
                        removeInvoice(invoice.id);
                      }}
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
                })}
            </TableBody>
          </Table>
        </Grid>
        <Grid item xs={0} md={9} />
        <Grid item xs={12} md={3}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="h6">Total</Typography>
            </Grid>
            <Grid item xs={6} sx={{ textAlign: "right" }}>
              <Typography variant="h6">
                ${centsToDollars(payment.price_in_cents || 0)}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default PaymentFields;
