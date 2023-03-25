import React from "react";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Collapse,
  IconButton,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import useAxios from "../useAxios";
import * as paths from "../PathHelper";
import Unit from "./Unit";

import LaunchIcon from "@mui/icons-material/Launch";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AddBoxIcon from "@mui/icons-material/AddBox";

const Row = ({ row, deleteCallback }) => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="large"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell
          onClick={() => {
            navigate("units/" + row.id);
          }}
          sx={{ cursor: "pointer" }}
        >
          {row.type_of}
        </TableCell>
        <TableCell>
          <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
            <Link component={RouterLink} to={"./units/" + row.id}>
              <LaunchIcon />
            </Link>
            <Link component={RouterLink} to={"./units/" + row.id + "/edit"}>
              <EditIcon />
            </Link>
            <Link
              onClick={(event) => {
                event.preventDefault();
                deleteCallback(row.id);
              }}
            >
              <DeleteIcon />
            </Link>
          </Box>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Unit unit={row} />
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

const Records = ({ units, deleteCallback }) => {
  return units.map((unit) => (
    <Row key={unit.name} row={unit} deleteCallback={deleteCallback} />
  ));
};

const Units = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState();
  const { propertyId } = useParams();
  const axios = useAxios();

  const changeHandler = (event) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    queryUnits();
  }, [query]);

  const debouncedChangeHandler = useCallback(
    debounce(changeHandler, 300),
    [],
  );

  const deleteUnit = (id) => {
    axios
      .delete(paths.API.UNITS(id))
      .then((res) => {
        // requery the properties as we've just deleted one
        queryUnits();
      })
      .catch((error) => {
        console.log(error);
        // display an error? Might be able to use the ErrorContext to shoot it up to the top.
      });
  };

  const queryUnits = () => {
    axios
      .get(paths.API.UNITS(), {
        params: { search: query, property: propertyId },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <TextField
        sx={{ mb: 2, width: 1, maxWidth: "md" }}
        id="property-search"
        label="Search for units by name..."
        variant="filled"
        onChange={debouncedChangeHandler}
        type="text"
      />
      <Box
        sx={{
          my: 1,
          display: "flex",
          justifyContent: "flex-end",
          width: 1,
          maxWidth: "md",
        }}
      >
        <Button
          component={RouterLink}
          to={"./units/new"}
          variant="outlined"
          startIcon={<AddBoxIcon />}
        >
          New
        </Button>
      </Box>
      <TableContainer component={Paper} sx={{ maxWidth: "md" }}>
        <Table aria-label="units listing">
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: 32 }} />
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              <Records units={data} deleteCallback={deleteUnit} />}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Units;

// Todo set this up so that the Accordion.Body instead lists all the units
// for a property
// This will require a units component of some kind, likely set up similar to how
// we've set up properties (e.g. Units.Index, Units.Edit)
// We'll also need some kind of Payment portal for entering payments for units.
//
// Additionally might instead of doing the accordion just go back to a table of
// properties that can be clicked to go to the unit listing
//
// Or possibly do a vertical nav for the properties and lcicking them will display
// units index for that property. The you can click on each of those to see the unit
// and do whatever needs done to it