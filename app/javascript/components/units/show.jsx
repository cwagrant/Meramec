import React from 'react'
import { Breadcrumb, Form } from 'react-bootstrap'
import { useQuery, gql } from '@apollo/client'
import  { useOutletContext, useParams } from 'react-router-dom'
import { Box, Grid, Stack, Typography } from '@mui/material'

const GetUnit = gql`
  query getUnit($unit: ID) {
    unit(id: $unit) {
      id
      name
      priceInCents
      typeOf
      property {
        id
        name
      }
    }
  }
`

const Show = () => { 
  const { propertyId, unitId } = useParams()
  const { currentUnit, setCurrentUnit } = useOutletContext()


  const setUnit = (data) => {
    setCurrentUnit(data.unit)
  }

  const { loading, error, data } = useQuery(GetUnit, 
    {
      variables: { unit: unitId },
      onCompleted: setUnit
    }
  )

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  
  const capitalizedType = () => {
    typeOf = data.unit.typeOf
    
    return typeOf.charAt(0).toUpperCase() + typeOf.slice(1)
  }

  return ( 
    <>
      <Box sx={{ p: 2, display: 'flex'}}>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Stack spacing={0.5}>
              <Typography variant="subtitle2">unit name</Typography>
              <Typography>{ data.unit.name }</Typography>
            </Stack>
          </Grid>
          <Grid item xs={2}>
            <Stack spacing={0.5}>
              <Typography variant="caption">unit type</Typography>
              <Typography variant="body1">{ capitalizedType() }</Typography>
            </Stack>
          </Grid>
          <Grid item xs={2}>
            <Stack spacing={0.5}>
              <Typography variant="caption">cost</Typography>
              <Typography variant="body1">${ parseFloat(data.unit.priceInCents/100).toFixed(2) }</Typography>
            </Stack>
          </Grid>
        </Grid>
      </Box>

      
      <Form>
        <div className="row mb-3">
          <Form.Label className="col-sm-2 col-form-label">Name</Form.Label>
          <div className="col-sm-10">
            <Form.Group className="input-group">
              <Form.Control defaultValue={data.unit.name} />
            </Form.Group>
          </div>
        </div>

        <div className="row mb-3">
          <Form.Label className="col-sm-2 col-form-label">Cost</Form.Label>
          <div className="col-sm-10">
            <Form.Group className="input-group">
              <span className="input-group-text">$</span>
              <Form.Control defaultValue={parseFloat(data.unit.priceInCents/100).toFixed(2)} />
            </Form.Group>
          </div>
        </div>

        <div className="row mb-3">
          <Form.Label className="col-sm-2 col-form-label">Type</Form.Label>
          <div className="col-sm-10">
            <Form.Group className="input-group">
              <Form.Select defaultValue={data.unit.typeOf}>
                <option value="n/a">N/A</option>
                <option value="apartment">Apartment</option>
                <option value="storage">Storage</option>
                <option value="parking">Parking</option>
              </Form.Select>
            </Form.Group>
          </div>
        </div>
      </Form>
    </>
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

