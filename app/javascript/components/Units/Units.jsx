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
import { useSnackbar } from "notistack";
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
  const { enqueueSnackbar } = useSnackbar();
  const axios = useAxios(enqueueSnackbar);

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
        queryUnits();
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
      .catch((error) => {
        enqueueSnackbar(
          "Looks like there was an error in finding the existing units",
          { variant: "error" },
        );
      });
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
