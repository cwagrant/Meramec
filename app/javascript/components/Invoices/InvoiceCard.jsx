import React from "react";
import {
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const InvoiceCard = ({ invoice }) => {
  if (!invoice) return <CircularProgress />;

  const stateLookup = {
    "paid": "Paid",
    "pending": "Pending",
    "sent": "Sent",
    "draft": "Draft",
  };

  return (
    <List>
      <ListItem>
        <ListItemIcon>
          <CalendarMonthIcon />
        </ListItemIcon>
        <ListItemText
          primary={invoice.date}
          secondary="Invoice Date"
        />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <CalendarMonthIcon />
        </ListItemIcon>
        <ListItemText
          primary={stateLookup[invoice.state] || "N/A"}
          secondary="Invoice Status"
        />
      </ListItem>
    </List>
  );
};

export default InvoiceCard;
