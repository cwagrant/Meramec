import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { Box, Grid, Stack, Typography } from '@mui/material'
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

const Unit = (props) => {
  const { unitId } = props;

  const { loading, error, data } = useQuery(GetUnit, 
    {
      variables: { unit: unitId },
    }
  )

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <Grid container spacing={2} columns={8}>
      <Grid item xs={2}/>
      <Grid item xs={2}>
        Name
      </Grid>
      <Grid item xs={4}>
        <Typography>{data.unit.name}</Typography>
      </Grid>

      <Grid item xs={2}/>
      <Grid item xs={2}>
        Type
      </Grid>
      <Grid item xs={4}>
        <Typography>{capitalizeFirstLetter(data.unit.typeOf)}</Typography>
      </Grid>

      <Grid item xs={2}/>
      <Grid item xs={2}>
        Name
      </Grid>
      <Grid item xs={4}>
        <Typography>{centsToDollars(data.unit.priceInCents)}</Typography>
      </Grid>
    </Grid>)
}

export default Unit


//TODO we want to show something that gives us th name of the unit,
// the type of unit, the price, the address, additional details, and
// eventually the current renter and possibly even additional details 
// about them or such.
//
// Possibly even doing an inline form but I think not.
