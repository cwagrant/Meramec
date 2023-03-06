import React from "react";
import { Autocomplete, Divider, TextField } from "@mui/material";
import { gql, useQuery } from "@apollo/client";
import SelectCustomer from "../Customers/SelectCustomer";

const GET_UNITS = gql`
  query allUnits {
    units {
      id
      name
      typeOf
    }
  }
`;

/* Probably going to do this where we'll have a
 * property drop down of all properties - maybe
 * have a checkbox to filter it down to only open properties (or vice versa)
 *
 * Then we'll have another dropdown for Customer which
 * will be accompanied by a button to create a customer that
 * will load the user fields into the form. If you use that
 * we'll pass it in to the input to create the user when we
 * create the agreement.
 *
 * Eventually we'll need terms and other things but for now this
 * should suffice.
 *
 * Probably make the selects individual components in their respective folders?
 * */

const FormFields = (props) => {
  const { loading, error, data } = useQuery(GET_UNITS);
  const [unitOptions, setUnitOptions] = React.useState([]);
  const [includeOccupiedUnits, setIncludeOccupiedUnits] = React.useState(true);
  const [unit, setUnit] = React.useState(null);

  React.useEffect(() => {
    if (!loading && props.rentalAgreement?.unit) {
      const optionUnit = unitOptions.find((element) =>
        element.id == props.rentalAgreement?.unit.id
      );

      setUnit(optionUnit);
    }
  }, [props.rentalAgreement, unitOptions]);

  React.useEffect(() => {
    if (unit) {
      let { label, ...selectedUnit } = unit;
      props.setRentalAgreement({
        ...props.rentalAgreement,
        unit: selectedUnit,
      });
    }
  }, [unit]);

  React.useEffect(() => {
    const options = data?.units.map((unit) => {
      return {
        ...unit,
        "label": unit.name,
      };
    });

    setUnitOptions(options || []);
  }, [data]);

  return (
    <>
      <Divider>Unit</Divider>

      <Autocomplete
        disablePortal
        disableCloseOnSelect
        id="unit"
        options={unitOptions}
        value={unit}
        onChange={(event, newValue) => {
          props.setRentalAgreement({
            ...props.rentalAgreement,
            unit: newValue,
          });
        }}
        sx={{ width: 1, pr: 2 }}
        renderInput={(params) => <TextField {...params} label="Unit" />}
        isOptionEqualToValue={(option, value) => {
          return option?.id === value?.id;
        }}
      />

      <Divider>Customer</Divider>
      <SelectCustomer
        rentalAgreement={props.rentalAgreement}
        setRentalAgreement={props.setRentalAgreement}
      />
    </>
  );
};

export default FormFields;
/*
 * Want to add a checkbox for including/excluding rented units
 */
