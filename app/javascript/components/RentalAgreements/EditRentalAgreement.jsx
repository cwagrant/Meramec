import React from "react";
import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  Grid,
  Switch,
} from "@mui/material";
import { useOutletContext, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { isEmpty } from "lodash";

import useAxios from "../useAxios";
import * as paths from "../PathHelper";
import RentalAgreementFields from "./RentalAgreementFields";
import { Customer, RentalAgreement, Unit } from "../Models";
import CustomerFields from "../Customers/CustomerFields";
import SelectCustomer from "../Customers/SelectCustomer";
import SelectUnit from "../Units/SelectUnit";
import SelectProperty from "../Properties/SelectProperty";
import { centsToDollars } from "../DataFormatHelpers";
import simpleReducer from "../reducer";

const Edit = () => {
  const { agreementId } = useParams();
  const { rentalAgreement: contextRentalAgreement, setRentalAgreement } =
    useOutletContext();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const axios = useAxios(enqueueSnackbar);

  const [newCustomer, setNewCustomer] = React.useState(false);
  const [property, setProperty] = React.useState(null);
  const [rentalAgreement, dispatch] = React.useReducer(simpleReducer, {
    ...RentalAgreement,
    customer: null,
    unit: { ...Unit },
  });

  React.useEffect(() => {
    if (isEmpty(contextRentalAgreement)) return;

    let addPrice = {
      ...contextRentalAgreement,
      price: centsToDollars(contextRentalAgreement.price_in_cents),
    };

    dispatch({ type: "initialize", value: addPrice });

    if (contextRentalAgreement?.unit?.property_id) {
      setProperty(contextRentalAgreement.property);
    }
  }, [contextRentalAgreement]);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .put(
        paths.API.RENTAL_AGREEMENTS(agreementId),
        { rental_agreement: rentalAgreement },
      )
      .then((res) => {
        const id = res.data.id;
        enqueueSnackbar("Rental Agreement updated successfully", {
          variant: "success",
        });
        setRentalAgreement(res.data);
        navigate(`/agreements/${id}`);
      });
  };

  return (
    <Box sx={{ maxWidth: "md", p: 2 }} component="form" onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <RentalAgreementFields
            rentalAgreement={rentalAgreement}
            dispatch={dispatch}
          />
        </Grid>
        <Grid item xs={12}>
          <Divider>Unit</Divider>
          <SelectProperty
            property={property}
            onChange={(newProperty) => {
              dispatch({ type: "unit_id", value: null });
              dispatch({ type: "unit", value: null });
              setProperty(newProperty);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <SelectUnit
            unit={rentalAgreement.unit}
            property={property}
            onChange={(newUnit) => {
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
        </Grid>
        <Grid item xs={12}>
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
        </Grid>
        <Grid item xs={12}>
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
                if (!window.confirm("Are you sure you wish to cancel?")) {
                  return;
                }
                navigate("..");
              }}
            >
              Cancel
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Edit;
