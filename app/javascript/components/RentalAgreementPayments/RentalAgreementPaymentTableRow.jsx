import React from "react";
import {
  Box,
  Button,
  ButtonGroup,
  InputAdornment,
  TextField,
} from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { centsToDollars } from "../DataFormatHelpers";
import AccountAdjustmentTableRow from "../AccountAdjustment/AccountAdjustmentTableRow";

const RentalAgreementPaymentTableRow = (
  { row, onChange, onDelete, readOnly },
) => {
  const navigate = useNavigate();
  const [showNote, setShowNote] = React.useState(false);
  const [amount, setAmount] = React.useState("");

  React.useEffect(() => {
    if (row?.amount_in_cents) {
      setAmount(centsToDollars(row.amount_in_cents));
    }
  }, [row.amount_in_cents]);

  const compareFunc = (a, b) => {
    if (a.key < b.key) {
      return -1;
    }

    if (a.key > b.key) {
      return 1;
    }

    return 0;
  };

  const {
    rental_agreement: rentalAgreement,
    account_adjustments: accountAdjustments,
  } = row;

  const getAdjustments = () => {
    if (!accountAdjustments) return [];
    return accountAdjustments.filter((adjustment) => adjustment?._destroy != 1);
  };

  const adjustmentsByType = (adjustmentType) => {
    return getAdjustments().filter((adjustment) =>
      adjustment.type_of === adjustmentType
    ).sort(compareFunc);
  };

  const addAdjustment = (typeOf) => {
    const newAdjustment = {
      rental_agreement_id: rentalAgreement.id,
      key: Date.now(),
      type_of: typeOf,
      price: "",
      reason: "",
      reason_description: "",
    };

    onChange({
      ...row,
      account_adjustments: [
        ...accountAdjustments,
        newAdjustment,
      ],
    });
  };

  const changeAdjustment = (updatedAdjustment) => {
    let oldAdjustments = accountAdjustments.filter((
      adjustment,
    ) => updatedAdjustment.key != adjustment.key);

    onChange({
      ...row,
      account_adjustments: [
        ...oldAdjustments,
        updatedAdjustment,
      ],
    });
  };

  const deleteAdjustment = (adjustmentKey) => {
    if (!window.confirm("Are you sure?")) return;

    let adjustmentToDelete = accountAdjustments.find((
      adjustment,
    ) => adjustment.key == adjustmentKey);

    let oldAdjustments = accountAdjustments.filter((
      adjustment,
    ) => adjustment.key != adjustmentKey);

    adjustmentToDelete["_destroy"] = 1;
    onChange({
      ...row,
      account_adjustments: [
        ...oldAdjustments,
        adjustmentToDelete,
      ],
    });
  };
  return (
    <>
      <TableRow
        tabIndex={-1}
        key={row.id}
        sx={{ cursor: "pointer", "& > *": { borderBottom: "unset!important" } }}
      >
        <TableCell>{row.rental_agreement.unit.name}</TableCell>
        <TableCell>
          {centsToDollars(row.rental_agreement.price_in_cents)}
        </TableCell>
        <TableCell>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            {!readOnly &&
              (
                <ButtonGroup>
                  <Button
                    tabIndex={-1}
                    key="makeNoteVisible"
                    onClick={() => {
                      setShowNote(!showNote);
                    }}
                  >
                    {showNote ? "Hide" : "Show"} Note
                  </Button>
                  <Button
                    tabIndex={-1}
                    key="addDiscount"
                    onClick={() => {
                      addAdjustment("discount");
                    }}
                  >
                    Add Discount
                  </Button>
                  <Button
                    tabIndex={-1}
                    key="addFee"
                    onClick={() => {
                      addAdjustment("fee");
                    }}
                  >
                    Add Fee
                  </Button>
                </ButtonGroup>
              )}
            {readOnly &&
              (
                <TextField
                  size="small"
                  multiline
                  label="Notes"
                  rows={2}
                  value={row.note}
                  onChange={(event) =>
                    onChange({
                      ...row,
                      note: event.target.value,
                    })}
                  sx={{ width: 1, pr: 2 }}
                  InputProps={{ readOnly: readOnly }}
                />
              )}
          </Box>
        </TableCell>
        <TableCell align="right" sx={{}}>
          <TextField
            sx={{ flexGrow: 1, width: 1 }}
            size="small"
            name="amount"
            id="amount"
            placeholder="0.00"
            value={amount}
            onChange={(event) => {
              setAmount(event.target.value);
              onChange({
                ...row,
                amount: event.target.value,
              });
            }}
            InputProps={{
              readOnly: readOnly,
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
        </TableCell>
      </TableRow>
      {showNote &&
        (
          <TableRow key={`noteFor${row.id}`}>
            <TableCell colSpan={4}>
              <TextField
                multiline
                name="note"
                id="note"
                label="Notes"
                rows={2}
                value={row.note}
                onChange={(event) =>
                  onChange({
                    ...row,
                    note: event.target.value,
                  })}
                sx={{ width: 1, pr: 2 }}
                InputProps={{ readOnly: readOnly }}
              />
            </TableCell>
          </TableRow>
        )}

      <TableRow key={`adjusmentsFor${row.id}`}>
        <TableCell colSpan={2} />
        <TableCell colSpan={2}>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            {getAdjustments().length > 0 &&
              (
                <Table
                  sx={{ maxWidth: "sm", " & .MuiTableCell-root": { p: 1 } }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell>Type</TableCell>
                      <TableCell>Reason</TableCell>
                      <TableCell>Amount</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {adjustmentsByType("discount").map((adjustment) => (
                      <AccountAdjustmentTableRow
                        key={adjustment.key || adjustment.id}
                        adjustment={adjustment}
                        onChange={changeAdjustment}
                        readOnly={readOnly}
                        onDelete={deleteAdjustment}
                      />
                    ))}
                    {adjustmentsByType("fee").map((adjustment) => (
                      <AccountAdjustmentTableRow
                        key={adjustment.key || adjustment.id}
                        adjustment={adjustment}
                        onChange={changeAdjustment}
                        readOnly={readOnly}
                        onDelete={deleteAdjustment}
                      />
                    ))}
                  </TableBody>
                </Table>
              )}
          </Box>
        </TableCell>
      </TableRow>
    </>
  );
};

export default RentalAgreementPaymentTableRow;
