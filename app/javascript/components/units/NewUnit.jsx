import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { Box, FormControl, OutlinedInput, Input, InputLabel, InputAdornment, MenuItem,  Select, TextField} from '@mui/material'
import { useParams } from 'react-router-dom'
import { capitalizeFirstLetter, centsToDollars } from '../DataFormatHelpers'

/* mutation will go here 
const AddUnit = gql`
`
*/

const Unit = () => {
  const [unitType, setUnitType] = React.useState(0)

  const handleChange = (event) => {
    setUnitType(event.target.value)
  }
  return (
    <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '40ch' }}}>
      <div>
        <TextField required id="name" label="Name" placeholder="Name"/>
        
        <FormControl sx={{ minWidth: 240 }}>
          <InputLabel id="unit-type-select-label">Type</InputLabel>
          <Select 
            labelId="unit-type-select-label"
            id="unit-type-select"
            label="Type"
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

        <FormControl>
          <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel> 
          <OutlinedInput id="standard-adornment-amount" label="Amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        </FormControl>

        <TextField required id="name" label="Name" defaultValue=""/>
        <TextField required id="price" label="Price" defaultValue="0.00"/>
      </div>
    </Box>
  )
}

export default Unit


//TODO we want to show something that gives us th name of the unit,
// the type of unit, the price, the address, additional details, and
// eventually the current renter and possibly even additional details 
// about them or such.
//
// Possibly even doing an inline form but I think not.
