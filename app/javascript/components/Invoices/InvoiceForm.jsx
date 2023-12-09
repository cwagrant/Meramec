import React from "react";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { isEmpty } from "lodash";

import FormFields from "./InvoiceFields";
import SelectCustomer from "../Customers/SelectCustomer";
import RentalAgreementInvoiceRow from "../RentalAgreements/InvoiceTableRow";
import InvoiceAdjustmentDialog from "../InvoiceAdjustments/InvoiceAdjustmentDialog";
import InvoiceAdjustmentTableRow from "../InvoiceAdjustments/InvoiceAdjustmentTableRow";
import useAxios from "../useAxios";
import * as paths from "../PathHelper";
import simpleReducer from "../reducer";
import { Invoice } from "../Models";
import { centsToDollars } from "../DataFormatHelpers";

const NewInvoice = ({ invoice: loadedInvoice, onSubmit, mode }) => {
  const { enqueueSnackbar } = useSnackbar();
  const axios = useAxios(enqueueSnackbar);
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [invoice, dispatch] = React.useReducer(simpleReducer, {
    ...Invoice,
    customer: null,
  });

  const handleSubmit = (event) => {
    onSubmit(event, invoice);
  };

  React.useEffect(() => {
    if (loadedInvoice) return;
    dispatch({ type: "invoice_items", value: [] });

    if (!invoice.customer) return;

    axios
      .get(paths.API.CUSTOMERS(invoice.customer.id))
      .then((res) => {
        let invoice_items = [];

        res.data.rental_agreements.map((agreement) => {
          const newInvoiceItem = {
            item: agreement,
            item_id: agreement.id,
            item_type: "RentalAgreement",
            item_count: 1,
          };

          if (agreement.active) {
            invoice_items.push(newInvoiceItem);
          }
        });

        dispatch({ type: "invoice_items", value: invoice_items });
      });
  }, [invoice.customer]);

  React.useEffect(() => {
    if (!invoice) return;
    let subtotal = invoice.invoice_items.reduce(
      (acc, item) => acc + (item.item.price_in_cents * item.item_count),
      0,
    );

    let adjustments = invoice.invoice_adjustments.filter((a) =>
      a?._destroy != 1
    ).reduce(
      (acc, item) =>
        acc + ((item.type_of == "fee" ? 1 : -1) * item.price_in_cents),
      0,
    );

    dispatch({ type: "subtotal_in_cents", value: subtotal });
    dispatch({ type: "total_in_cents", value: subtotal + adjustments });
  }, [
    JSON.stringify(invoice?.invoice_items),
    JSON.stringify(invoice?.invoice_adjustments),
  ]);

  React.useEffect(() => {
    if (loadedInvoice) {
      dispatch({ type: "initialize", value: loadedInvoice });
    }
  }, [loadedInvoice]);

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
        <Grid item xs={12}>
          <Paper sx={{ my: 2, p: 2 }}>
            <Typography>
              Note: Updating an invoice will modify the Rental Agreements Next
              Due Date. You will need to manually adjust the date if you are
              back-dating entries and do not wish for the date to change.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <FormFields
            invoice={invoice}
            onChange={(key, newValue) => {
              dispatch({ type: key, value: newValue });
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <SelectCustomer
            readOnly={mode === "edit"}
            customer={invoice.customer}
            onChange={(newValue) => {
              dispatch({ type: "customer", value: newValue });
              dispatch({ type: "customer_id", value: newValue?.id });
              dispatch({ type: "invoice_ids", value: [] });
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
                  <TableCell sx={{ width: "75px" }} align="center">
                    Qty
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoice.invoice_items.map((row, index) => (
                  <RentalAgreementInvoiceRow
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

        <Grid item xs={12} sx={{ textAlign: "right" }}>
          <Button variant="outlined" onClick={() => setDialogOpen(true)}>
            Add Adjustment
          </Button>
          <InvoiceAdjustmentDialog
            open={dialogOpen}
            onClose={() => {
              setDialogOpen(false);
            }}
            onCancel={() => setDialogOpen(false)}
            onSubmit={(adjustment) => {
              dispatch({
                type: `invoice_adjustments`,
                value: [...invoice.invoice_adjustments, adjustment],
              });
              setDialogOpen(false);
            }}
          />
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
              <Typography variant="h6">Total</Typography>
            </Grid>
            <Grid item xs={6} sx={{ textAlign: "right" }}>
              <Typography variant="h6">
                ${centsToDollars(invoice.total_in_cents || 0)}
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

export default NewInvoice;
