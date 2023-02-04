import React from 'react'
import { useOutletContext } from 'react-router-dom'
import { Box, Grid, Paper, Stack, Typography } from '@mui/material'
import { capitalizeFirstLetter, centsToDollars } from '../DataFormatHelpers'

const Show = () => { 
  const { currentUnit } = useOutletContext()

  if (!currentUnit) return 'Loading...'

  return ( 
    <Paper>
      <Box sx={{ p: 2, display: 'flex'}}>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Stack spacing={0.5}>
              <Typography variant="subtitle2">unit name</Typography>
              <Typography>{ currentUnit.name }</Typography>
            </Stack>
          </Grid>
          <Grid item xs={2}>
            <Stack spacing={0.5}>
              <Typography variant="caption">unit type</Typography>
              <Typography variant="body1">
                { capitalizeFirstLetter(currentUnit.typeOf) }
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={2}>
            <Stack spacing={0.5}>
              <Typography variant="caption">cost</Typography>
              <Typography variant="body1">
                ${ centsToDollars(currentUnit.priceInCents) }
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  )
}

export default Show

//
//What about a show is something card like where we'll have a
//
//Perhaps don't even have a full Show page, just when you click
//it will bring up a card/modal type spot (maybe on the side of the page?)
//
//Or even beter, have the card be inside a collpasible table component.
//No actual show page, just a section that opens up and shows details about the unit
//
//
//
//Name (dot) TypeOf (dot) Cost
//Address (or Property address)
//
//Created: 
//Updated: 

