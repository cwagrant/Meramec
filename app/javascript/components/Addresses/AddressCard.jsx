import React from "react";
import {
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const AddressListItem = ({ address }) => {
  const { address_1, address_2, city, state_code, zipcode, country_code } =
    address;

  return (
    <List>
      <ListItem>
        <ListItemIcon>
          <LocationOnIcon />
        </ListItemIcon>
        <ListItemText
          primary={
            <>
              <Typography>{address_1}</Typography>
              {address_2 && address_2.length > 0 &&
                <Typography>{address_2}</Typography>}

              <Typography>
                {`${city}, ${state_code} ${zipcode}`}
              </Typography>
              {country_code && country_code.length > 0 &&
                <Typography>{country_code}</Typography>}
            </>
          }
        />
      </ListItem>
    </List>
  );
};
const AddressCard = ({ address }) => {
  if (!address) return <CircularProgress />;

  return <AddressListItem address={address} />;
};

export default AddressCard;
export { AddressCard, AddressListItem };
