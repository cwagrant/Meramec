import React from "react";
import { Box, Button, Paper } from "@mui/material";
import { useOutletContext, useParams } from "react-router-dom";
import FormFields from "./FormFields";
import { useNavigate } from "react-router-dom";
import useAxios from "../useAxios";
import * as paths from "../PathHelper";

const Edit = () => {
  const { agreementId } = useParams();
  const { rentalAgreement, setRentalAgreement } = useOutletContext();
  const navigate = useNavigate();
  const axios = useAxios();

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .put(
        paths.API.RENTAL_AGREEMENTS(agreementId),
        document.querySelector("#rentalAgreementForm"),
      )
      .then((res) => {
        const id = res.data.id;
        navigate(`/agreements/${id}`);
        setRentalAgreement(res.data);
      })
      .catch((error) => console.log(error));
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
      <Paper sx={{ p: 1 }}>
        <FormFields
          rentalAgreement={rentalAgreement}
          setRentalAgreement={setRentalAgreement}
        />

        <Box sx={{ display: "flex", m: 1 }}>
          <Button
            variant="outlined"
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Edit;

//TODO we want to show something that gives us th name of the unit,
// the type of unit, the price, the address, additional details, and
// eventually the current renter and possibly even additional details
// about them or such.
//
// Possibly even doing an inline form but I think not.
