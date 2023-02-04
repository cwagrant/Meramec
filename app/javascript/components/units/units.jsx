import React from 'react'
import { debounce } from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import { useLazyQuery, useQuery, gql} from '@apollo/client'
import { Link as RouterLink, useOutletContext, useParams } from 'react-router-dom'
import { Box, Collapse, IconButton, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, TextField } from '@mui/material'

import LaunchIcon from '@mui/icons-material/Launch';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

import Unit from  './ShowUnit'

const GET_UNITS = gql`
  query allUnits($property_id: ID, $unit_name: String) {
    units(attributes: { propertyId: $property_id, name: $unit_name}) {
      id
      name
      typeOf
    }
  }
`

const Row = (props) => {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="large"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell>
          {row.typeOf}
        </TableCell>
        <TableCell>
          <Box sx={{display: 'flex', justifyContent: 'space-evenly'}}>
            <Link component={RouterLink} to={"./units/"+row.id}>
              <LaunchIcon />
            </Link>
            <Link component={RouterLink} to={"./units/"+row.id+"/edit"}>
              <EditIcon />
            </Link>
            <Link component={RouterLink} to={"./units/"+row.id} >
              <DeleteIcon />
            </Link>
          </Box>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0}} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Unit unitId={row.id} />
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )


}

const Records = ({units}) => {
  return units.map((unit) => (
    <Row key={unit.name} row={unit} />
  ))
}

const Units = () => {

  const [ query, setQuery ] = useState("")
  const [ searchUnits, { data }] = useLazyQuery(GET_UNITS)
  const { propertyId } = useParams()
  const { setCurrentUnit } = useOutletContext()

  const changeHandler = event => {
    setQuery(event.target.value) 
  }


  useEffect( () => {
    searchUnits({variables: { property_id: propertyId, unit_name: query }})
  }, [data, query])

  const debouncedChangeHandler = useCallback(
    debounce(changeHandler, 300),
    []
  )

  useEffect( () => {
  })

  return (
    <>
      <TextField
        sx={{ mb: 2, width: 1, maxWidth: 'md' }}
        id="property-search"
        label="Search for units by name..."
        variant="filled"
        onChange={debouncedChangeHandler}
        type="text"
      />
      <TableContainer component={Paper} sx={{maxWidth: 'md'}}>
        <Table aria-label="units listing">
          <TableHead>
            <TableRow>
              <TableCell sx={{width: 32}} />
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { data && 
              <Records units={data.units}/>
            }
          </TableBody>
        </Table>
      </TableContainer>
    </>
  ) 
};

export default Units 


// Todo set this up so that the Accordion.Body instead lists all the units
// for a property
// This will require a units component of some kind, likely set up similar to how
// we've set up properties (e.g. Units.Index, Units.Edit)
// We'll also need some kind of Payment portal for entering payments for units.
//
// Additionally might instead of doing the accordion just go back to a table of
// properties that can be clicked to go to the unit listing
//
// Or possibly do a vertical nav for the properties and lcicking them will display
// units index for that property. The you can click on each of those to see the unit
// and do whatever needs done to it
