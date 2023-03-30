import React from "react";
import { Box, Divider, Paper } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import { default as RentalAgreementPayment } from "../RentalAgreementPayments/FormFields";

import SelectCustomer from "../Customers/SelectCustomer";
import useAxios from "../useAxios";
import * as paths from "../PathHelper";

const PaymentFields = ({ payment, onChange, readOnly }) => {
  const [value, setValue] = React.useState({
    date: null,
    customer: null,
  });
  const [data, setData] = React.useState();
  const axios = useAxios();
  const [customerId, setCustomerId] = React.useState(0);
  const [paymentDate, setPaymentDate] = React.useState(null);

  React.useEffect(() => {
    if (payment) {
      if (payment.date) {
        setPaymentDate(dayjs(payment.date));
      } else {
        setPaymentDate(dayjs());
      }
    } else {
      setPaymentDate(dayjs());
    }

    if (readOnly) {
      findAgreements();
    }
  }, []);

  React.useEffect(() => {
    if (onChange) {
      onChange({
        ...payment,
        date: paymentDate,
      });
    }
  }, [paymentDate]);

  React.useEffect(() => {
    if (customerId) {
      findAgreements();
    }
  }, [customerId]);

  const findAgreements = () => {
    axios
      .get(paths.API.CUSTOMERS(customerId))
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Paper
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <input
          type="hidden"
          name="payment[customer_id]"
          id="payment_customer_id]"
          value={customerId}
        />
        <input
          type="hidden"
          name="payment[date]"
          id="payment_date"
          value={dayjs(paymentDate).format("YYYY-MM-DD")}
        />
        <SelectCustomer
          readOnly={readOnly}
          customer={payment.customer}
          onChange={(newValue) => {
            onChange({
              ...payment,
              customer: newValue,
            });
            setCustomerId(newValue?.id);
          }}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            required
            id="payment_date"
            name="payment[date]"
            label="Date"
            sx={{ width: 1, m: 1, maxWidth: "sm" }}
            value={paymentDate}
            onChange={(newValue) => {
              setPaymentDate(newValue);
            }}
          />
        </LocalizationProvider>
      </Paper>
      <Paper sx={{ my: 1 }}>
        <Box sx={{ width: 1 }}>
          <Divider>Rental Agreements</Divider>
          {data && (
            data.rental_agreements.map((agreement) => {
              return (
                <RentalAgreementPayment
                  key={agreement.id}
                  rentalAgreement={agreement}
                />
              );
            })
          )}
        </Box>
      </Paper>
    </>
  );
};

export default PaymentFields;
