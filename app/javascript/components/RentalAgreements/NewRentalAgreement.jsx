import React from "react";
import { Box, Button, Paper } from "@mui/material";
import FormFields from "./FormFields";
import { useNavigate } from "react-router-dom";
import useAxios from "../useAxios";
import * as paths from "../PathHelper";

const New = () => {
  const [rentalAgreement, setRentalAgreement] = React.useState(null);
  const navigate = useNavigate();
  const axios = useAxios();

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(
        paths.API.RENTAL_AGREEMENTS(),
        document.querySelector("#rentalAgreementForm"),
      )
      .then((res) => {
        const id = res.data.id;
        navigate(`/agreements/${id}`);
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

export default New;
