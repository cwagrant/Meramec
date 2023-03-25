import React from "react";
import { Box, Button } from "@mui/material";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import FormFields from "./FormFields";
import useAxios from "../useAxios";
import * as paths from "../PathHelper";

const Edit = () => {
  const { customerId } = useParams();
  const { customer, setCustomer } = useOutletContext();
  const axios = useAxios();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .put(
        paths.API.CUSTOMERS(customerId),
        document.querySelector("#customerForm"),
      )
      .then((res) => {
        const id = res.data.id;
        setCustomer(res.data);
        navigate("/customers/" + id);
      })
      .catch((error) => console.log(error));
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

export default Edit;
