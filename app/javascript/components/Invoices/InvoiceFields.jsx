import React from "react";
import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const InvoiceFields = ({ invoice, onChange, readOnly }) => {
  if (!invoice) return;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <DatePicker
          required
          readOnly={readOnly}
          label="Invoice Date"
          sx={{ width: 1 }}
          value={dayjs.isDayjs(invoice.date)
            ? invoice.date
            : invoice.date
            ? dayjs(invoice.date)
            : null}
          onChange={(newValue) => {
            onChange("date", newValue);
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl sx={{ width: 1 }}>
          <InputLabel id="frequency-label">Status</InputLabel>
          <Select
            labelId="frequency-label"
            label="Status"
            value={invoice.state || "draft"}
            onChange={(event) => {
              onChange("state", event.target.value);
            }}
            readOnly={readOnly}
          >
            <MenuItem value="draft">Draft</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="sent">Sent</MenuItem>
            <MenuItem
              value="paid"
              onClick={() => {
                alert(
                  "Warning! Marking an invoice as paid will prevent you from recording a payment for it.",
                );
              }}
            >
              Paid
            </MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default InvoiceFields;
// TODO
// How do we handle the Count of what people buy. We're giving them something
// for a rental agreement. I think in this case count is synonymous w/ the number
// of months they are paying for so we need to pass in some value we'll use in the
// controller but it doesn't need to be a part of anything
//
// E.g.
// {...invoice,
//  products: { [id]: count, [id]: count}
// }
//
// or we just make it something we pass the rental_agreements to it and set a value/count on the
// rental agreements object. Then we have to figure out how to pass the update back up the
// chain which as it's an array of objects isn't easy. Alternatively we make some kind of handler
// function we pass into the invoicerentalagreement row thing.
