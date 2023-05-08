import * as React from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const DEFAULT_ROWS_PER_PAGE = 50;

function PaginatedTableHead({ headCells }) {
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
            >
              {headCell.label}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
}

export default function PaginatedTable(props) {
  const [page, setPage] = React.useState(0);
  const [visibleRows, setVisibleRows] = React.useState(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(DEFAULT_ROWS_PER_PAGE);
  const {
    rows,
    TableHeaders,
    TableRow: ProvidedTableRow,
    onDelete,
    TableProps,
  } = props;

  React.useEffect(() => {
    if (!rows) return;

    let rowsOnMount = rows.slice(
      0 * DEFAULT_ROWS_PER_PAGE,
      0 * DEFAULT_ROWS_PER_PAGE + DEFAULT_ROWS_PER_PAGE,
    );

    setVisibleRows(rowsOnMount);
  }, [rows]);

  const handleChangePage = React.useCallback(
    (event, newPage) => {
      if (!rows) return;
      setPage(newPage);

      const updatedRows = rows.slice(
        newPage * rowsPerPage,
        newPage * rowsPerPage + rowsPerPage,
      );

      setVisibleRows(updatedRows);

      // Avoid a layout jump when reaching the last page with empty rows.
      const numEmptyRows = newPage > 0
        ? Math.max(0, (1 + newPage) * rowsPerPage - rows.length)
        : 0;
    },
    [rowsPerPage],
  );

  const handleChangeRowsPerPage = React.useCallback(
    (event) => {
      const updatedRowsPerPage = parseInt(event.target.value, 10);
      setRowsPerPage(updatedRowsPerPage);

      setPage(0);

      const updatedRows = rows.slice(
        0 * updatedRowsPerPage,
        0 * updatedRowsPerPage + updatedRowsPerPage,
      );

      setVisibleRows(updatedRows);
    },
    [],
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
            <PaginatedTableHead
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
