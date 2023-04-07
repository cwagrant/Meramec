import React from "react";
import { Box, Button } from "@mui/material";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { isEmpty } from "lodash";

import PropertyFields from "./PropertyFields";
import useAxios from "../useAxios";
import * as paths from "../PathHelper";
import simpleReducer from "../reducer";
import AddressFields from "../Addresses/AddressFields";
import { Address } from "../Models";

const Edit = () => {
  const { propertyId } = useParams();
  const { property: sourceProperty, setProperty } = useOutletContext();
  const [property, dispatch] = React.useReducer(simpleReducer, {
    name: "",
    address: { ...Address },
  });
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const axios = useAxios(enqueueSnackbar);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .put(
        paths.API.PROPERTIES(propertyId),
        { property: property },
      )
      .then((res) => {
        const id = res.data.id;

        setProperty(res.data);
        enqueueSnackbar("Property updated successfully", {
          variant: "success",
        });
        navigate("/properties/" + id);
      });
  };

  React.useEffect(() => {
    if (isEmpty(sourceProperty)) return;

    dispatch({ type: "initialize", value: sourceProperty });
  }, [sourceProperty]);

  return (
    <Box
      component="form"
      id="propertyForm"
      onSubmit={handleSubmit}
      sx={{
        width: 1,
        maxWidth: "sm",
        "& .MuiFormControl-root": { m: 1, maxWidth: "sm" },
      }}
    >
      <PropertyFields
        property={property}
        dispatch={dispatch}
      />

      <AddressFields
        address={property.address}
        dispatch={dispatch}
      />

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

export default Edit;
