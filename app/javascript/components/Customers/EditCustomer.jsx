import React from "react";
import { Box, Button } from "@mui/material";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import FormFields from "./CustomerFields";
import useAxios from "../useAxios";
import { useSnackbar } from "notistack";
import * as paths from "../PathHelper";

const Edit = () => {
  const { customerId } = useParams();
  const { customer, setCustomer } = useOutletContext();
  const { enqueueSnackbar } = useSnackbar();
  const axios = useAxios(enqueueSnackbar);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .put(
        paths.API.CUSTOMERS(customerId),
        { customer: customer },
      )
      .then((res) => {
        const id = res.data.id;
        setCustomer(res.data);
        enqueueSnackbar("Customer updated successfully", {
          variant: "success",
        });
        navigate("/customers/" + id);
      });
  };

  return (
    <Box sx={{ maxWidth: "md" }}>
      <FormFields
        customer={customer}
        onChange={(newValue) => {
          setCustomer(newValue);
        }}
      />

      <Box sx={{ display: "flex", mt: 2, gap: 2 }}>
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
