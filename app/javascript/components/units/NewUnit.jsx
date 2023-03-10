import React from 'react'
import { useMutation, gql } from '@apollo/client'
import { Box, Button, FormControl, OutlinedInput, Input, InputLabel, InputAdornment, MenuItem,  Select, TextField} from '@mui/material'
import { useParams } from 'react-router-dom'
import { dollarsToCents } from '../DataFormatHelpers'
import UnitFormFields from './UnitFormFields'

const ADD_UNIT = gql`
  mutation AddUnit($attributes: UnitCreateInput!) {
    unitCreate(input: $attributes) {
      unit{
        id
        name
        typeOf
        priceInCents
        propertyId
      }
    }
  }
`

const Unit = () => {
  const { propertyId } = useParams()
  const [addUnit, {data, loading, error}] = useMutation(ADD_UNIT)

  const handleSubmit = (event) => {
    event.preventDefault();
    let formData = new FormData(event.target)

    let preparedData = {
      "attributes": {
        "unitInput": {
          "name": formData.get('name'),
          "typeOf": formData.get('typeOf'),
          "priceInCents": dollarsToCents(formData.get('priceInCents')),
          "propertyId": propertyId
        }
      }
    }

    addUnit({variables: preparedData})

    /* need to add error handling and redirecting user after creating new unit */
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{width: 1, maxWidth: 'sm', '& .MuiFormControl-root': { m: 1, maxWidth: 'sm' }}}>

      <UnitFormFields values={{}}/>

      <Box sx={{display: 'flex', m: 1}}>
        <Button 
          variant="outlined"
          type="submit"
        >
          Submit
        </Button>
      </Box>
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
