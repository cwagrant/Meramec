import React from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FormFields from "./CustomerFields";
import useAxios from "../useAxios";
import { useSnackbar } from "notistack";
import * as paths from "../PathHelper";

const Edit = () => {
  const { enqueueSnackbar } = useSnackbar();
  const axios = useAxios(enqueueSnackbar);
  const navigate = useNavigate();
  const [customer, setCustomer] = React.useState({
    company: "",
    first_name: "",
    last_name: "",
    gate_code: "",
    email: "",
    phone_number: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(paths.API.CUSTOMERS(), { customer: customer })
      .then((res) => {
        const id = res.data.id;
        enqueueSnackbar("Customer created successfully", {
          variant: "success",
        });
        navigate(`/customers/${id}`);
      });
  };

  return (
    <Box
      component="form"
      id="customerForm"
      onSubmit={handleSubmit}
      sx={{
        width: 1,
        maxWidth: "sm",
        "& .MuiFormControl-root": { m: 1, maxWidth: "sm" },
      }}
    >
      <FormFields
        customer={customer}
        onChange={(newValue) => setCustomer(newValue)}
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
