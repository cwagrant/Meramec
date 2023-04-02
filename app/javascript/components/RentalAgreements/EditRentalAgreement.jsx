import React from "react";
import { Box, Button, Paper } from "@mui/material";
import { useOutletContext, useParams } from "react-router-dom";
import RentalAgreementFields from "./RentalAgreementFields";
import { useNavigate } from "react-router-dom";
import useAxios from "../useAxios";
import * as paths from "../PathHelper";
import { useSnackbar } from "notistack";

const Edit = () => {
  const { agreementId } = useParams();
  const { rentalAgreement, setRentalAgreement } = useOutletContext();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const axios = useAxios(enqueueSnackbar);

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
      <Box sx={{ p: 1 }}>
        {rentalAgreement &&
          (
            <RentalAgreementFields
              rentalAgreement={rentalAgreement}
              onChange={(newValue) => {
                setRentalAgreement(newValue);
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
    </Box>
  );
};

export default Edit;
