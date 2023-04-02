import React from "react";
import { DatePicker } from "@mui/x-date-pickers";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import RentalAgreementPaymentTableRow from "../RentalAgreementPayments/RentalAgreementPaymentTableRow";
import SelectCustomer from "../Customers/SelectCustomer";
import useAxios from "../useAxios";
import * as paths from "../PathHelper";
import dayjs from "dayjs";
import { centsToDollars } from "../DataFormatHelpers";

const PaymentFields = ({ payment, onChange, readOnly, lockCustomer }) => {
  const axios = useAxios();

  React.useEffect(() => {
    let customerId = payment?.customer_id || payment?.customer?.id;
    if (customerId) {
      axios
        .get(paths.API.CUSTOMERS(customerId))
        .then((res) => {
          if (!onChange) return;
          onChange({ ...payment, customer: res.data });
        })
        .catch((error) => console.log(error));
    }
  }, [payment.customer_id]);

  const compareFunc = (a, b) => {
    if (a.rental_agreement.unit.name < b.rental_agreement.unit.name) {
      return -1;
    }

    if (a.rental_agreement.unit.name > b.rental_agreement.unit.name) {
      return 1;
    }

    return 0;
  };

  React.useEffect(() => {
    if (!payment?.customer?.rental_agreements) return;
    if (!onChange) return;

    let newAgreementPayments = [];

    for (agreement of payment.customer.rental_agreements) {
      newAgreementPayments.push({
        rental_agreement: agreement,
        rental_agreement_id: agreement.id,
        amount: (agreement.price_in_cents
          ? centsToDollars(agreement.price_in_cents)
          : ""),
        notes: "",
        account_adjustments: [],
      });
    }

    onChange({
      ...payment,
      rental_agreement_payments: newAgreementPayments,
    });
  }, [payment.customer?.id]);

  const agreementPaymentChangeHandler = (updatedPayment) => {
    let agreements = payment.rental_agreement_payments.filter((agreement) =>
      updatedPayment.rental_agreement.id != agreement.rental_agreement.id
    );

    onChange({
      ...payment,
      rental_agreement_payments: [...agreements, updatedPayment],
    });
  };

  if (!payment) return;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 1,
          width: 1,
        }}
      >
        <SelectCustomer
          sx={{ flexGrow: 1, flexBasis: 0 }}
          readOnly={readOnly || lockCustomer}
          customer={payment.customer}
          onChange={(newValue) => {
            onChange({
              ...payment,
              customer_id: newValue.id,
            });
          }}
        />
        <DatePicker
          readOnly={readOnly}
          required
          id="payment_date"
          name="payment[date]"
          label="Date"
          sx={{ flexGrow: 1, flexBasis: 0 }}
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
      </Box>
      <Box sx={{ width: 1 }}>
        <TableContainer
          sx={{ overflow: "clip", "& .MuiTableCell-root": { p: 1 } }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: "75px" }}>Unit</TableCell>
                <TableCell sx={{ width: "75px" }}>Cost</TableCell>
                <TableCell sx={{ width: "auto" }} />
                <TableCell sx={{ width: "200px" }} align="center">
                  Paid
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payment.rental_agreement_payments && (
                payment.rental_agreement_payments.sort(compareFunc).map(
                  (agreementPayment) => {
                    return (
                      <RentalAgreementPaymentTableRow
                        key={agreementPayment.rental_agreement.id}
                        row={agreementPayment}
                        onChange={agreementPaymentChangeHandler}
                        readOnly={readOnly}
                      />
                    );
                  },
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default PaymentFields;
