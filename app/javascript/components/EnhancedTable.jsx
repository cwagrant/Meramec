import * as React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import CircularProgress from "@mui/material/CircularProgress";
import { get } from "lodash";
import Cookies from "universal-cookie";

const cookies = new Cookies();

function descendingComparator(a, b, orderBy) {
  bOrder = get(b, orderBy) || "";
  aOrder = get(a, orderBy) || "";

  if (bOrder < aOrder) {
    return -1;
  }
  if (bOrder > aOrder) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const DEFAULT_ROWS_PER_PAGE = 50;

function EnhancedTableHead(props) {
  const {
    order,
    orderBy,
    onRequestSort,
    headCells,
  } = props;
  const createSortHandler = (newOrderBy) => (event) => {
    onRequestSort(event, newOrderBy);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell, index) => {
          if (headCell.id === null) return <TableCell key={index} />;

          return (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? "right" : "left"}
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id
                  ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </Box>
                  )
                  : null}
              </TableSortLabel>
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

export default function EnhancedTable(props) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [visibleRows, setVisibleRows] = React.useState(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(DEFAULT_ROWS_PER_PAGE);
  const {
    rows,
    DefaultOrder,
    DefaultOrderBy,
    TableHeaders,
    TableRow: ProvidedTableRow,
    onDelete,
    TableProps,
    TableKey,
  } = props;

  React.useEffect(() => {
    if (!rows) return;

    let order = cookies.get(`TK${TableKey}DefaultOrder`) || DefaultOrder;
    let orderBy = cookies.get(`TK${TableKey}DefaultOrderBy`) || DefaultOrderBy;

    setOrder(order);
    setOrderBy(orderBy);

    let rowsOnMount = rows.sort(
      getComparator(order, orderBy),
    );

    rowsOnMount = rowsOnMount.slice(
      0 * DEFAULT_ROWS_PER_PAGE,
      0 * DEFAULT_ROWS_PER_PAGE + DEFAULT_ROWS_PER_PAGE,
    );

    setVisibleRows(rowsOnMount);
  }, [rows]);

  const handleRequestSort = React.useCallback(
    (event, newOrderBy) => {
      const isAsc = orderBy === newOrderBy && order === "asc";
      const toggledOrder = isAsc ? "desc" : "asc";
      setOrder(toggledOrder);
      setOrderBy(newOrderBy);
      cookies.set(`TK${TableKey}DefaultOrder`, toggledOrder, {
        sameSite: "strict",
      });
      cookies.set(`TK${TableKey}DefaultOrderBy`, newOrderBy, {
        sameSite: "strict",
      });

      const sortedRows = rows.sort(
        getComparator(toggledOrder, newOrderBy),
      );
      const updatedRows = sortedRows.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      );

      setVisibleRows(updatedRows);
    },
    [order, orderBy, page, rowsPerPage],
  );

  const handleChangePage = React.useCallback(
    (event, newPage) => {
      if (!rows) return;
      setPage(newPage);

      const sortedRows = rows.sort(getComparator(order, orderBy));
      const updatedRows = sortedRows.slice(
        newPage * rowsPerPage,
        newPage * rowsPerPage + rowsPerPage,
      );

      setVisibleRows(updatedRows);

      // Avoid a layout jump when reaching the last page with empty rows.
      const numEmptyRows = newPage > 0
        ? Math.max(0, (1 + newPage) * rowsPerPage - rows.length)
        : 0;
    },
    [order, orderBy, rowsPerPage],
  );

  const handleChangeRowsPerPage = React.useCallback(
    (event) => {
      const updatedRowsPerPage = parseInt(event.target.value, 10);
      setRowsPerPage(updatedRowsPerPage);

      setPage(0);

      const sortedRows = rows.sort(getComparator(order, orderBy));
      const updatedRows = sortedRows.slice(
        0 * updatedRowsPerPage,
        0 * updatedRowsPerPage + updatedRowsPerPage,
      );

      setVisibleRows(updatedRows);
    },
    [order, orderBy],
  );

  if (!rows) {
    return (
      <Box sx={{ display: "flex" }}>
        <Paper sx={{ p: 3 }}>
          <CircularProgress />
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table
            {...TableProps}
            aria-labelledby="tableTitle"
            size={"medium"}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              headCells={TableHeaders}
            />
            <TableBody>
              {visibleRows
                ? visibleRows.map((row) => {
                  return (
                    <ProvidedTableRow
                      key={row.id}
                      row={row}
                      onDelete={onDelete}
                    />
                  );
                })
                : null}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          sx={{
            "& .MuiTablePagination-selectLabel": { mt: 2 },
            "& .MuiTablePagination-displayedRows": { mt: 2 },
          }}
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          count={rows?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
