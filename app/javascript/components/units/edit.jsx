import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { Box, TextField} from '@mui/material'
import { useParams } from 'react-router-dom'
import { capitalizeFirstLetter, centsToDollars } from '../DataFormatHelpers'

const GetUnit = gql`
  query getUnit($unit: ID) {
    unit(id: $unit) {
      id
      name
      priceInCents
      typeOf
    }
  }
`

const Unit = () => {
  const { unitId } = useParams();

  const { loading, error, data } = useQuery(GetUnit, 
    {
      variables: { unit: unitId },
    }
  )


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '40ch' }}}>
      <div>
        <TextField required id="name" label="Name" defaultValue={data.unit.name}/>
        <TextField required id="name" label="Name" defaultValue={data.unit.name}/>
        <TextField required id="price" label="Price" defaultValue={centsToDollars(data.unit.priceInCents)}/>
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
