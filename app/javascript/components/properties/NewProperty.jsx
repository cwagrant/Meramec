import React from 'react'
import { useMutation, gql } from '@apollo/client'
import { Box, Button } from '@mui/material'
import { useParams } from 'react-router-dom'
import FormFields from './FormFields'

const ADD_PROPERTY = gql`
  mutation AddProperty($attributes: PropertyCreateInput!) {
    propertyCreate(input: $attributes) {
      property{
        id
        name
      }
    }
  }
`

const Property = () => {
  const [addProperty, { data }] = useMutation(ADD_PROPERTY)

  const handleSubmit = (event) => {
    event.preventDefault();
    let formData = new FormData(event.target)

    let preparedData = {
      "attributes": {
        "propertyInput": {
          "name": formData.get('name'),
        }
      }
    }

    addProperty({variables: preparedData})

    /* need to add error handling and redirecting user after creating new unit */
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{width: 1, maxWidth: 'sm', '& .MuiFormControl-root': { m: 1, maxWidth: 'sm' }}}>

      <FormFields values={{}}/>

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

export default Property


//TODO we want to show something that gives us th name of the unit,
// the type of unit, the price, the address, additional details, and
// eventually the current renter and possibly even additional details 
// about them or such.
//
// Possibly even doing an inline form but I think not.
