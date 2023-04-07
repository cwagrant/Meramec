import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";

import simpleReducer from "../reducer";
import { InvoiceAdjustment } from "../Models";
import { dollarsToCents } from "../DataFormatHelpers";

const InvoiceAdjustmentDialog = ({ open, onClose, onCancel, onSubmit }) => {
  const [adjustment, dispatch] = React.useReducer(simpleReducer, {
    ...InvoiceAdjustment,
  });
  // const [dialogOpen, toggleDialog] = React.useReducer(() => !dialogOpen, false);

  return (
    <Dialog
      fullWidth={true}
      maxWidth={"sm"}
      open={open}
      onClose={() => {
        dispatch({ type: "initialize", value: InvoiceAdjustment });
        onClose();
      }}
    >
      <DialogTitle>Add a Discount or Fee</DialogTitle>
      <DialogContent>
        <RadioGroup
          row
          name="adjustment-type"
          value={adjustment.type_of}
          onChange={(event) =>
            dispatch({ type: "type_of", value: event.target.value })}
        >
          <FormControlLabel
            value="discount"
            control={<Radio />}
            label="Discount"
          />
          <FormControlLabel
            value="fee"
            control={<Radio />}
            label="Fee"
          />
        </RadioGroup>
        <FormControl sx={{ width: 1 }}>
          <InputLabel id="adjustment-reason-label">Reason</InputLabel>
          <Select
            labelId="adjustment-reason-label"
            label="Reason"
            value={adjustment.reason || ""}
            onChange={(event) => {
              dispatch({ type: "reason", value: event.target.value });
            }}
          >
            <MenuItem value=""></MenuItem>
            <MenuItem value="late">Late</MenuItem>
            <MenuItem value="prepay">Prepay</MenuItem>
            <MenuItem value="prorate">Prorate</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </FormControl>
        {adjustment.reason == "other" &&
          (
            <TextField
              required
              id="adjustment_reason_description"
              label="Other Reason"
              name="adjustment[reason_description]"
              sx={{ width: 1, mt: 2 }}
              value={adjustment.reason_description}
              onChange={(event) => {
                dispatch({
                  type: "reason_description",
                  value: event.target.value,
                });
              }}
            />
          )}
        <TextField
          required
          label="Amount"
          sx={{ width: 1, mt: 2 }}
          value={adjustment.price}
          onChange={(event) => {
            dispatch({
              type: "price",
              value: event.target.value,
            });
            dispatch({
              type: "price_in_cents",
              value: dollarsToCents(event.target.value || 0),
            });
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: 1,
            justifyContent: "flex-end",
          }}
        >
          <Button
            onClick={() => {
              onSubmit(adjustment);
            }}
          >
            Add
          </Button>
          <Button
            onClick={() => {
              onCancel();
            }}
          >
            Cancel
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default InvoiceAdjustmentDialog;
