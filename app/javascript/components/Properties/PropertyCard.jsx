import React from "react";
import {
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ApartmentIcon from "@mui/icons-material/Apartment";
import { AddressListItem } from "../Addresses/AddressCard";

const PropertyCard = ({ property }) => {
  if (!property) return <CircularProgress />;

  return (
    <List>
      <ListItem>
        <ListItemIcon>
          <ApartmentIcon />
        </ListItemIcon>
        <ListItemText
          primary={property.name}
          secondary="Name"
        />
      </ListItem>
      {property.address &&
        <AddressListItem address={property.address} />}
    </List>
  );
};

export default PropertyCard;
