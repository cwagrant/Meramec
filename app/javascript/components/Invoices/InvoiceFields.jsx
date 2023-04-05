import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

import SelectCustomer from "../Customers/SelectCustomer";
import InvoiceAdjustmentTableRow from "../InvoiceAdjustments/InvoiceAdjustmentTableRow";
import RentalAgreementInvoiceRow from "../RentalAgreements/InvoiceTableRow";
import useAxios from "../useAxios";
import * as paths from "../PathHelper";
import { centsToDollars, dollarsToCents } from "../DataFormatHelpers";

const StyledInput = styled(TextField)(({ theme }) => ({
  width: "100%",
  maxWidth: theme.breakpoints.sm,
}));

const InvoiceFields = ({ invoice, onChange, readOnly, lockCustomer }) => {
  const axios = useAxios();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [adjustment, setAdjustment] = React.useState({
    id: "",
    type_of: "discount",
    reason: "",
    reason_description: "",
    price_in_cents: "",
    price: "",
    created_at: Date.now(),
  });

  const resetAdjustment = () =>
    setAdjustment({
      id: "",
      type_of: "discount",
      reason: "",
      reason_description: "",
      price_in_cents: "",
      price: "",
      created_at: Date.now(),
    });

  const changeCustomer = (customer) => {
    if (!customer) {
      onChange({
        customer: null,
        customer_id: null,
        invoice_items: [],
      });
      return;
    }
    axios
      .get(paths.API.CUSTOMERS(customer.id))
      .then((res) => {
        let invoice_items = [];

        res.data.rental_agreements.map((agreement) => {
          const newInvoiceItem = {
            item: agreement,
            item_id: agreement.id,
            item_type: "RentalAgreement",
            item_count: 1,
          };

          invoice_items.push(newInvoiceItem);
        });

        onChange({
          ...invoice,
          customer: customer,
          customer_id: customer?.id,
          invoice_items: invoice_items,
        });
      });
  };

  const invoiceChangeHandler = (newValue) => {
    if (!onChange || !invoice) return;
    let oldInvoices = invoice.invoice_items.filter((
      item,
    ) => item.item_id != newValue.item_id);

    let newInvoices = [...oldInvoices, newValue];
    newInvoices = newInvoices.sort((a, b) => {
      if (a.item_id == b.item_id) {
        return 0;
      }

      return a.item_id < b.item_id ? 1 : -1;
    });

    onChange({
      ...invoice,
      invoice_items: newInvoices,
    });
  };

  const sortedAdjustments = () => {
    if (!invoice || !invoice.invoice_adjustments) return [];

    return invoice.invoice_adjustments.filter((adj) => !adj?._destroy).sort(
      (a, b) => {
        if (a.created_at == b.created_at) return 0;

        return a.created_at < b.created_at ? -1 : 1;
      },
    );
  };

  const sortedAgreements = () => {
    if (!invoice || !invoice.invoice_items) return [];

    return invoice.invoice_items.sort(
      (a, b) => {
        if (a.item.name == b.item.name) return 0;

        return a.item.name < b.item.name ? -1 : 1;
      },
    );
  };

  const deleteAdjustment = (id) => {
    if (!window.confirm("Are you sure?")) return;

    let adjustmentToDelete = invoice.invoice_adjustments.find((
      adjustment,
    ) => adjustment.id == id);

    let oldAdjustments = invoice.invoice_adjustments.filter((
      adjustment,
    ) => adjustment.id != id);

    adjustmentToDelete["_destroy"] = 1;
    onChange({
      ...invoice,
      account_adjustments: [
        ...oldAdjustments,
        adjustmentToDelete,
      ],
    });
  };

  React.useEffect(() => {
    if (!onChange || !invoice) return;
    let subtotal = invoice.invoice_items.reduce(
      (acc, item) => acc + (item.item.price_in_cents * item.item_count),
      0,
    );

    let adjustments = sortedAdjustments().reduce(
      (acc, item) =>
        acc + ((item.type_of == "fee" ? 1 : -1) * item.price_in_cents),
      0,
    );

    onChange({
      ...invoice,
      subtotal_in_cents: subtotal,
      total_in_cents: subtotal + adjustments,
    });
  }, [invoice?.invoice_items, invoice?.invoice_adjustments]);

  if (!invoice) return;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <DatePicker
          required
          label="Invoice Date"
          sx={{ width: 1 }}
          value={dayjs.isDayjs(invoice.date)
            ? invoice.date
            : invoice.date
            ? dayjs(invoice.date)
            : null}
          onChange={(newValue) => {
            onChange({ ...invoice, date: newValue });
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
              onChange({
                ...invoice,
                state: event.target.value,
              });
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
      <Grid item xs={12}>
        <SelectCustomer
          readOnly={readOnly || lockCustomer}
          customer={invoice.customer}
          onChange={(newValue) => {
            changeCustomer(newValue);
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: "auto" }}>Description</TableCell>
                <TableCell sx={{ width: "75px" }}>Unit</TableCell>
                <TableCell sx={{ width: "75px" }}>Cost</TableCell>
                <TableCell sx={{ width: "75px" }} align="center">Qty</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedAgreements().map((row) => (
                <RentalAgreementInvoiceRow
                  key={row.item.id}
                  row={row}
                  onChange={(newValue) => {
                    invoiceChangeHandler(newValue);
                  }}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
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
      <Grid item xs={12}>
        {!readOnly &&
          <Button onClick={() => setDialogOpen(true)}>Add Adjustment</Button>}
        <Dialog
          fullWidth={true}
          maxWidth={"sm"}
          open={dialogOpen}
          onClose={() => {
            setDialogOpen(false);
            resetAdjustment();
          }}
        >
          <DialogTitle>Add a Discount or Fee</DialogTitle>
          <DialogContent>
            <RadioGroup
              row
              name="adjustment-type"
              value={adjustment.type_of}
              onChange={(event) =>
                setAdjustment({ ...adjustment, type_of: event.target.value })}
            >
              <FormControlLabel
                value="discount"
                control={<Radio />}
                label="Discount"
              />
              <FormControlLabel
                value="fee"
                control={<Radio />}
                label="Fee"
              />
            </RadioGroup>
            <FormControl sx={{ width: 1 }}>
              <InputLabel id="adjustment-reason-label">Reason</InputLabel>
              <Select
                labelId="adjustment-reason-label"
                label="Reason"
                value={adjustment.reason || ""}
                onChange={(event) => {
                  setAdjustment({
                    ...adjustment,
                    reason: event.target.value,
                  });
                }}
              >
                <MenuItem value=""></MenuItem>
                <MenuItem value="late">Late</MenuItem>
                <MenuItem value="prepay">Prepay</MenuItem>
                <MenuItem value="prorate">Prorate</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
            {adjustment.reason == "other" &&
              (
                <TextField
                  required
                  id="adjustment_reason_description"
                  label="Other Reason"
                  name="adjustment[reason_description]"
                  sx={{ width: 1, mt: 2 }}
                  value={adjustment.reason_description}
                  onChange={(event) => {
                    setAdjustment({
                      ...adjustment,
                      reason_description: event.target.value,
                    });
                  }}
                />
              )}
            <TextField
              required
              label="Amount"
              sx={{ width: 1, mt: 2 }}
              value={adjustment.price}
              onChange={(event) => {
                setAdjustment({
                  ...adjustment,
                  price: event.target.value,
                  price_in_cents: dollarsToCents(event.target.value || 0),
                });
              }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: 1,
                justifyContent: "flex-end",
              }}
            >
              <Button
                onClick={() => {
                  const adjustments = invoice?.invoice_adjustments
                    ? [...invoice.invoice_adjustments]
                    : [];
                  onChange({
                    ...invoice,
                    invoice_adjustments: [
                      ...adjustments,
                      adjustment,
                    ],
                  });

                  resetAdjustment();
                  setDialogOpen(false);
                }}
              >
                Add
              </Button>
              <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
            </Box>
          </DialogContent>
        </Dialog>
      </Grid>
      {invoice && sortedAdjustments() && (
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
                {sortedAdjustments().map((adj) => (
                  <InvoiceAdjustmentTableRow
                    readOnly={readOnly}
                    key={adj.id}
                    row={adj}
                    onDelete={deleteAdjustment}
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
