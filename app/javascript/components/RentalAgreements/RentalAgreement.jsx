import React from "react";
import { Link as RouterLink, useOutletContext } from "react-router-dom";
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { default as CustomerForm } from "../Customers/CustomerFields";
import { default as UnitForm } from "../Units/UnitFields";
import { centsToDollars } from "../DataFormatHelpers";
import EditIcon from "@mui/icons-material/Edit";
import AddBoxIcon from "@mui/icons-material/AddBox";

const Show = () => {
  const { rentalAgreement, setRentalAgreement } = useOutletContext();

  if (!rentalAgreement) return "Loading...";

  return (
    <Box sx={{ maxWidth: "sm", p: 2 }}>
      <Box
        sx={{
          display: "flex",
          maxWidth: "md",
          justifyContent: "flex-end",
          m: 1,
          gap: 1,
        }}
      >
        <ButtonGroup variant="outlined">
          <Button
            component={RouterLink}
            to={"./edit"}
            startIcon={<EditIcon />}
          >
            Edit
          </Button>
          <Button
            component={RouterLink}
            to={"../new"}
            startIcon={<AddBoxIcon />}
          >
            New
          </Button>
        </ButtonGroup>
      </Box>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Rental Agreement - #{rentalAgreement.id}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          "& .MuiFormControl-root": { m: 1, maxWidth: "sm" },
        }}
      >
        <TextField
          label="Start Date"
          value={rentalAgreement.start_date || "Missing"}
          readOnly={true}
        />
        <TextField
          label="End Date"
          value={rentalAgreement.end_date || "Active"}
          readOnly={true}
        />
        <TextField
          label="Next Due Date"
          value={rentalAgreement.next_due_date || "Missing"}
          readOnly={true}
        />
        <FormControl>
          <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            readOnly={true}
            id="unit_price"
            name="unit[price]"
            label="Amount"
            type="number"
            value={centsToDollars(rentalAgreement.price_in_cents) || "Missing"}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        </FormControl>
      </Box>
      <Divider>Unit</Divider>
      <UnitForm unit={rentalAgreement.unit} readOnly={true} hidePrice />
      <Divider>Customer</Divider>
      <CustomerForm customer={rentalAgreement.customer} readOnly={true} />
    </Box>
  );
};

export default Show;
