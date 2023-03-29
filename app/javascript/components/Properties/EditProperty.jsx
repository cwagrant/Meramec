import React from "react";
import { Box, Button } from "@mui/material";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import FormFields from "./FormFields";
import useAxios from "../useAxios";
import { useSnackbar } from "notistack";

const UPDATE_PROPERTY_URL = "/api/properties/";

const Edit = () => {
  const { propertyId } = useParams();
  const { currentProperty, setCurrentProperty } = useOutletContext();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const axios = useAxios(enqueueSnackbar);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .put(
        `${UPDATE_PROPERTY_URL}${propertyId}`,
        document.querySelector("#propertyForm"),
      )
      .then((res) => {
        const id = res.data.id;

        setCurrentProperty(res.data);
        enqueueSnackbar("Property updated successfully", {
          variant: "success",
        });
        navigate("/properties/" + id);
      });
  };

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
      <FormFields values={currentProperty} />

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
