import React from "react";
import {
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import RepeatIcon from "@mui/icons-material/Repeat";
import { centsToDollars } from "../DataFormatHelpers";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ScheduleIcon from "@mui/icons-material/Schedule";

const RentalAgreementCard = ({ rentalAgreement }) => {
  if (!rentalAgreement) return <CircularProgress />;
  return (
    <List>
      <ListItem>
        <ListItemIcon>
          <CalendarMonthIcon />
        </ListItemIcon>
        <ListItemText
          primary={rentalAgreement.start_date}
          secondary="Start"
        />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <CalendarMonthIcon />
        </ListItemIcon>
        <ListItemText
          primary={rentalAgreement.end_date}
          secondary="End"
        />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <ScheduleIcon />
        </ListItemIcon>
        <ListItemText
          primary={rentalAgreement.next_due_date}
          secondary="Next Due Date"
        />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <RepeatIcon />
        </ListItemIcon>
        <ListItemText
          primary={rentalAgreement.frequency_in_months}
          secondary="Billing Frequency"
        />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <AttachMoneyIcon />
        </ListItemIcon>
        <ListItemText
          primary={`$${centsToDollars(rentalAgreement.price_in_cents)}`}
          secondary="Billing Amount"
        />
      </ListItem>
    </List>
  );
};

export default RentalAgreementCard;
