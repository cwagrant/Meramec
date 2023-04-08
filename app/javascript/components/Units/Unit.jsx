import React from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Box, Grid, Paper } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import UnitCard from "./UnitCard";
import ControlButtons from "../ControlButtons";
import useAxios from "../useAxios";
import * as paths from "../PathHelper";

const Show = () => {
  const { unit } = useOutletContext();
  const navigate = useNavigate();
  const axios = useAxios();

  const deleteUnit = (id) => {
    if (
      !window.confirm("Are you sure you wish to delete this Unit?")
    ) return;
    axios
      .delete(paths.API.UNITS(id))
      .then((res) => {
        navigate("..");
      });
  };

  if (!unit) return <CircularProgress />;

  return (
    <Box sx={{ maxWidth: "md" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ControlButtons
            newUrl="../new"
            editUrl={`./edit`}
            deleteCallback={() => deleteUnit(unit.id)}
          />
        </Grid>
        <Grid item xs={12}>
          <Paper>
            <UnitCard unit={unit} />
          </Paper>
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
