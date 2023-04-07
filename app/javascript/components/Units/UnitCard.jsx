import React from "react";
import {
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import HouseIcon from "@mui/icons-material/House";
import { AddressListItem } from "../Addresses/AddressCard";
import { capitalizeFirstLetter, centsToDollars } from "../DataFormatHelpers";

const UnitCard = ({ unit }) => {
  if (!unit) return <CircularProgress />;
  return (
    <List>
      <ListItem>
        <ListItemIcon>
          <InventoryIcon />
        </ListItemIcon>
        <ListItemText
          primary={unit.name}
          secondary="Name"
        />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          {unit.type_of == "storage" &&
            <WarehouseIcon />}
          {unit.type_of == "apartment" &&
            <HouseIcon />}
          {unit.type_of == "parking" &&
            <LocalParkingIcon />}
        </ListItemIcon>
        <ListItemText
          primary={capitalizeFirstLetter(unit.type_of)}
          secondary="Type"
        />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <WarehouseIcon />
        </ListItemIcon>
        <ListItemText
          primary={`$${centsToDollars(unit.price_in_cents)}`}
          secondary="Price"
        />
      </ListItem>
      {unit.address &&
        <AddressListItem address={unit.address} />}
    </List>
  );
};

export default UnitCard;
