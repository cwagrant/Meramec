import React from "react";
import { Box, Button, Divider, FormControlLabel, Switch } from "@mui/material";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

import useAxios from "../useAxios";
import * as paths from "../PathHelper";
import simpleReducer from "../reducer";
import RentalAgreementFields from "./RentalAgreementFields";
import { Customer, RentalAgreement, Unit } from "../Models";
import CustomerFields from "../Customers/CustomerFields";
import SelectCustomer from "../Customers/SelectCustomer";
import SelectUnit from "../Units/SelectUnit";
import SelectProperty from "../Properties/SelectProperty";
import { centsToDollars } from "../DataFormatHelpers";

const New = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const axios = useAxios(enqueueSnackbar);
  const [newCustomer, setNewCustomer] = React.useState(false);
  const [property, setProperty] = React.useState(null);
  const [rentalAgreement, dispatch] = React.useReducer(simpleReducer, {
    ...RentalAgreement,
    customer: null,
    unit: null,
    property: null,
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(
        paths.API.RENTAL_AGREEMENTS(),
        { rental_agreement: rentalAgreement },
      )
      .then((res) => {
        const id = res.data.id;
        enqueueSnackbar("Rental Agreement created successfully", {
          variant: "success",
        });
        navigate(`/agreements/${id}`);
      });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      id="rentalAgreementForm"
      sx={{
        width: 1,
        maxWidth: "sm",
        "& .MuiFormControl-root": { m: 1, maxWidth: "sm" },
      }}
    >
      <RentalAgreementFields
        rentalAgreement={rentalAgreement}
        dispatch={dispatch}
      />

      <Divider>Unit</Divider>
      <SelectProperty
        property={property}
        onChange={(newProperty) => {
          dispatch({ type: "unit_id", value: null });
          dispatch({ type: "unit", value: null });
          setProperty(newProperty);
        }}
      />

      <SelectUnit
        unit={rentalAgreement.unit}
        property={property}
        onChange={(newValue) => {
          dispatch({ type: "unit_id", value: newValue?.id });
          dispatch({ type: "unit", value: newValue });
          dispatch({
            type: "price",
            value: centsToDollars(newValue.price_in_cents),
          });
          dispatch({
            type: "price_in_cents",
            value: newValue.price_in_cents,
          });
        }}
      />

      <Divider sx={{ mt: 2 }}>Customer</Divider>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <FormControlLabel
          sx={{ m: 1 }}
          control={
            <Switch
              value={newCustomer}
              onChange={() => {
                if (newCustomer) {
                  dispatch({ type: "customer", value: null });
                } else {
                  dispatch({ type: "customer", value: { ...Customer } });
                }
                setNewCustomer(!newCustomer);
              }}
            />
          }
          label="New Customer"
        />
      </Box>

      {newCustomer &&
        (
          <CustomerFields
            customer={rentalAgreement.customer}
            dispatch={dispatch}
            namespace={["customer"]}
          />
        )}
      {!newCustomer &&
        (
          <SelectCustomer
            customer={rentalAgreement.customer}
            onChange={(newValue) => {
              dispatch({ type: "customer", value: newValue });
              dispatch({ type: "customer_id", value: newValue?.id });
            }}
          />
        )}

      <Box sx={{ display: "flex", m: 1, gap: 2 }}>
        <Button
          variant="outlined"
          type="submit"
        >
          Submit
        </Button>
        <Button
          variant="outlined"
          type="button"
          onClick={(event) => {
            event.preventDefault();
            if (!window.confirm("Are you sure you wish to cancel?")) return;
            navigate("..");
          }}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default New;
