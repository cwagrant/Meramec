import React from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import {
  Box,
  Button,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { useOutletContext, useParams } from "react-router-dom";
import { dollarsToCents } from "../DataFormatHelpers";
import UnitFormFields from "./UnitFormFields";

const UPDATE_UNIT = gql`
  mutation UpdateUnit($attributes: UnitUpdateInput!) {
    unitUpdate(input: $attributes) {
      unit{
        id
        name
        typeOf
        priceInCents
        propertyId
      }
    }
  }
`;

const Unit = () => {
  const { propertyId, unitId } = useParams();
  const { currentUnit } = useOutletContext();
  const [updateUnit, { data, loading, error }] = useMutation(UPDATE_UNIT);

  const handleSubmit = (event) => {
    event.preventDefault();
    let formData = new FormData(event.target);

    let preparedData = {
      "attributes": {
        "id": unitId,
        "unitInput": {
          "name": formData.get("name"),
          "typeOf": formData.get("typeOf"),
          "priceInCents": dollarsToCents(formData.get("priceInCents")),
          "propertyId": propertyId,
        },
      },
    };

    updateUnit({ variables: preparedData });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ width: 1, maxWidth: "sm" }}
    >
      <UnitFormFields values={currentUnit} />

      <Box sx={{ display: "flex", m: 1 }}>
        <Button
          variant="outlined"
          type="submit"
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default Unit;

//TODO we want to show something that gives us th name of the unit,
// the type of unit, the price, the address, additional details, and
// eventually the current renter and possibly even additional details
// about them or such.
//
// Possibly even doing an inline form but I think not.
