import React from "react";
import {
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import { centsToDollars } from "../DataFormatHelpers";

const PaymentCard = ({ payment }) => {
  if (!payment) return <CircularProgress />;

  const typeLookup = {
    "cash": "Cash",
    "check": "Check",
    "other": "Other",
  };

  return (
    <List>
      <ListItem>
        <ListItemIcon>
          <CalendarMonthIcon />
        </ListItemIcon>
        <ListItemText
          primary={payment.date}
          secondary="Payment Date"
        />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <CalendarMonthIcon />
        </ListItemIcon>
        <ListItemText
          primary={typeLookup[payment.payment_type] || "N/A"}
          secondary="Payment Type"
        />
      </ListItem>
      {payment.payment_type == "check" &&
        (
          <ListItem>
            <ListItemIcon>
              <CalendarMonthIcon />
            </ListItemIcon>
            <ListItemText
              primary={payment.check_number}
              secondary="Check Number"
            />
          </ListItem>
        )}
      {payment.paid_in_cents > 0 &&
        (
          <ListItem>
            <ListItemIcon>
              <CalendarMonthIcon />
            </ListItemIcon>
            <ListItemText
              primary={`$${centsToDollars(payment.paid_in_cents)}`}
              secondary="Amount Paid"
            />
          </ListItem>
        )}
    </List>
  );
};

export default PaymentCard;
