import React from "react";
import {
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import HouseIcon from "@mui/icons-material/House";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import PersonIcon from "@mui/icons-material/Person";
import { AddressListItem } from "../Addresses/AddressCard";
import StoreIcon from "@mui/icons-material/Store";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";

const CustomerCard = ({ customer }) => {
  if (!customer) return <CircularProgress />;
  return (
    <List component={Grid} container>
      {customer.company?.length > 0 &&
        (
          <ListItem>
            <ListItemIcon>
              <StoreIcon />
            </ListItemIcon>
            <ListItemText
              primary={customer.company}
              secondary="Company"
            />
          </ListItem>
        )}
      <ListItem>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText
          primary={customer.formal_name}
          secondary="Name"
        />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <VpnKeyIcon />
        </ListItemIcon>
        <ListItemText
          primary={customer.gate_code}
          secondary="Gate Code"
        />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <LocalPhoneIcon />
        </ListItemIcon>
        <ListItemText
          primary={customer.phone_number}
          secondary="Phone"
        />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <AlternateEmailIcon />
        </ListItemIcon>
        <ListItemText
          primary={customer.email}
          secondary="Email"
        />
      </ListItem>
      {customer.address &&
        <AddressListItem address={customer.address} />}
    </List>
  );
};

export default CustomerCard;
