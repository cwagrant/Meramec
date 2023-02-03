import React from 'react'
import { Box, FormControl, OutlinedInput, Input, InputLabel, InputAdornment, MenuItem, Select, TextField } from '@mui/material'
import { centsToDollars } from '../DataFormatHelpers'

const UnitFormFields = (props) => {

  const values = props.values || {}
  const typesOf = ["", "apartment", "storage", "parking"]

  const defaultUnitType = values.typeOf ? typesOf.indexOf(values.typeOf) : 0

  const [unitType, setUnitType] = React.useState(defaultUnitType)

  const handleChange = (event) => {
    setUnitType(event.target.value)
  }

  return (
    <>
      <Box sx={{ display: 'flex'}}>
        <TextField required
          id="name"
          label="Name"
          name="name"
          placeholder="Name"
          sx={{width: 1}}
          value={ values?.name }
        />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: 1}}>
        <FormControl sx={{width: 1/2}}>
          <InputLabel id="unit-type-select-label">Type</InputLabel>
          <Select 
            labelId="unit-type-select-label"
            id="unit-type-select"
            label="Type"
            name="typeOf"
            value={unitType}
            onChange={handleChange}
            >
            <MenuItem value={0}>
              <em>None</em>
            </MenuItem>
            <MenuItem value={1}>Apartment</MenuItem>
            <MenuItem value={2}>Storage</MenuItem>
            <MenuItem value={3}>Parking</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{width: 1/2}}>
          <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel> 
          <OutlinedInput 
            name="priceInCents"
            id="standard-adornment-amount"
            label="Amount"
            value={
              values.priceInCents ? centsToDollars(values.priceInCents) : ''}
            startAdornment={
              <InputAdornment position="start">$</InputAdornment>
            }
          />
        </FormControl>
      </Box>
    </>
  )
}

export default UnitFormFields
