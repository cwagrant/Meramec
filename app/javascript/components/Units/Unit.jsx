import React from "react";
import { useOutletContext } from "react-router-dom";
import { Box, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import { centsToDollars } from "../DataFormatHelpers";
import CircularProgress from "@mui/material/CircularProgress";
import UnitFields from "./UnitFields";
import AddressFields from "../Addresses/AddressFields";

const Show = ({ unit }) => {
  const { unit: contextUnit } = useOutletContext();

  let useUnit = contextUnit ? contextUnit : unit;

  if (!useUnit) return <CircularProgress />;

  useUnit = {
    ...useUnit,
    price: centsToDollars(useUnit.price_in_cents),
  };

  return (
    <Box sx={{ maxWidth: "md" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <UnitFields unit={useUnit} readOnly />
        </Grid>
        <Grid item xs={12}>
          <Divider>Address</Divider>
          <AddressFields address={useUnit.address} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Show;

//
//What about a show is something card like where we'll have a
//
//Perhaps don't even have a full Show page, just when you click
//it will bring up a card/modal type spot (maybe on the side of the page?)
//
//Or even beter, have the card be inside a collpasible table component.
//No actual show page, just a section that opens up and shows details about the unit
//
//
//
//Name (dot) TypeOf (dot) Cost
//Address (or Property address)
//
//Created:
//Updated:
