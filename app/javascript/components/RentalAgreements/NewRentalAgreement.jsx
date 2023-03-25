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

//TODO we want to show something that gives us th name of the unit,
// the type of unit, the price, the address, additional details, and
// eventually the current renter and possibly even additional details
// about them or such.
//
// Possibly even doing an inline form but I think not.
//
// 2023-2-15 I think we'll do like we did with the units autocomplete dropdown
// for Customers
//
// Then we can also have it be that you can select an option for "Add Customer..." and that
// will render the fields for the UserForm so you can put in the user's information.
//
// Finally we'll need to add the basic terms logic to add a rental term with a start and end
// date
//
