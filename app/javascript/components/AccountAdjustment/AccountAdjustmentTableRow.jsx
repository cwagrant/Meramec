import React from "react";
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { TableCell, TableRow } from "@mui/material";
import { centsToDollars } from "../DataFormatHelpers";
import DeleteIcon from "@mui/icons-material/Delete";

const AccountAdjustmentTableRow = (
  { adjustment, disabled, readOnly, onChange, onDelete },
) => {
  const adjustmentReasons = {
    discount: [{ value: "prorate", label: "Prorate" }, {
      value: "pre_payment",
      label: "Pre-Payment",
    }],
    fee: [{ value: "late", label: "Late" }],
  };
  return (
    <>
      <TableRow
        sx={{
          "& > *": { borderBottom: "unset!important" },
        }}
      >
        <TableCell>
          {!readOnly &&
            (
              <Box>
                <IconButton
                  color="error"
                  onClick={() => {
                    onDelete(adjustment.key);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            )}
        </TableCell>
        <TableCell>{adjustment.type_of}</TableCell>
        <TableCell>
          <FormControl sx={{ width: "175px" }}>
            <Select
              required
              variant="standard"
              labelId="adjustment_reason_label"
              value={adjustment.reason}
              onChange={(event) => {
                onChange({ ...adjustment, reason: event.target.value });
              }}
              readOnly={readOnly}
              disabled={disabled}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {adjustmentReasons[adjustment?.type_of].map((reason) => (
                <MenuItem key={reason.value} value={reason.value}>
                  {reason.label}
                </MenuItem>
              ))}
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
        </TableCell>
        <TableCell>
          <TextField
            InputProps={{
              disabled: disabled,
              readOnly: readOnly,
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            id="adjustment_price"
            name="adjustment[price]"
            variant="standard"
            value={adjustment.price ||
              centsToDollars(adjustment.price_in_cents)}
            onChange={(event) => {
              onChange(
                { ...adjustment, price: event.target.value },
              );
            }}
            sx={{ minWidth: "125px" }}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        {adjustment.reason == "other" &&
          (
            <TableCell colSpan={4}>
              <TextField
                required
                id="adjustment_reason_description"
                label="Other Reason"
                name="adjustment[reason_description]"
                sx={{ width: 1 }}
                value={adjustment.reason_description}
                onChange={(event) => {
                  onChange({
                    ...adjustment,
                    reason_description: event.target.value,
                  });
                }}
                InputProps={{
                  readOnly: readOnly,
                  disabled: disabled,
                }}
              />
            </TableCell>
          )}
      </TableRow>
    </>
  );
};

export default AccountAdjustmentTableRow;
