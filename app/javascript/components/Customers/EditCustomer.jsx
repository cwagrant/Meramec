import React from 'react'
import { useMutation, gql } from '@apollo/client'
import { Box, Button, } from '@mui/material'
import { useOutletContext, useParams } from 'react-router-dom'
import FormFields from './FormFields'

const UPDATE_PROPERTY = gql`
  mutation UpdateProperty($attributes: PropertyUpdateInput!) {
    propertyUpdate(input: $attributes) {
      property{
        id
        name
      }
    }
  }
`

const Edit = () => {
  const { customerId } = useParams()
  const { customer } = useOutletContext()
  const [updateProperty, {data, loading, error}] = useMutation(UPDATE_PROPERTY)

  console.log('test')

  const handleSubmit = (event) => {
    event.preventDefault();
    let formData = new FormData(event.target)

    let preparedData = {
      "attributes": {
        "id": customerId,
        "propertyInput": {
          "name": formData.get('name'),
        }
      }
    }

    updateProperty({variables: preparedData})
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{width: 1, maxWidth: 'sm', '& .MuiFormControl-root': { m: 1, maxWidth: 'sm' }}}>
      
      <FormFields values={customer}/>

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

export default Edit


//TODO we want to show something that gives us th name of the unit,
// the type of unit, the price, the address, additional details, and
// eventually the current renter and possibly even additional details 
// about them or such.
//
// Possibly even doing an inline form but I think not.
