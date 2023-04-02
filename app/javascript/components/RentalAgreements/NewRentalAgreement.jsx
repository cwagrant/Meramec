import React from "react";
import { Box, Button, Paper } from "@mui/material";
import RentalAgreementFields from "./RentalAgreementFields";
import { useNavigate } from "react-router-dom";
import useAxios from "../useAxios";
import * as paths from "../PathHelper";
import { useSnackbar } from "notistack";

const New = () => {
  const [rentalAgreement, setRentalAgreement] = React.useState({
    start_date: null,
    end_date: null,
    next_due_date: null,
    price_in_cents: "",
    unit: null,
    customer: null,
    price: "",
  });
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const axios = useAxios(enqueueSnackbar);

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
      <Box sx={{ p: 1 }}>
        <RentalAgreementFields
          rentalAgreement={rentalAgreement}
          onChange={(newValue) => setRentalAgreement(newValue)}
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
    </Box>
  );
};

export default New;
