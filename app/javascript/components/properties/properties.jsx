import React from 'react'
import { useState, useCallback, useEffect} from 'react'
import { useLazyQuery, gql } from '@apollo/client'
import { Link } from 'react-router-dom'
import { debounce } from 'lodash'
import { TableContainer, Table, TableRow, TableHead, TableBody, TableCell, TextField, Paper } from '@mui/material'

const GET_PROPERTIES = gql`
  query allProperties($name: String) { 
    properties(attributes: { name: $name }) {
      id
      name
    }
  }
`;

const Records = ({properties}) => {
  return properties.map(({id, name}) => (
    <TableRow key={id}>
      <TableCell>{id}</TableCell>
      <TableCell><Link to={"/properties/"+id}>{name}</Link></TableCell>
    </TableRow>
  ));
}

const Properties = () => {
  const [ query, setQuery ] = useState("")
  const [ searchProperties, { data }] = useLazyQuery(GET_PROPERTIES)

  const changeHandler = event => {
    setQuery(event.target.value) 
  }

  useEffect( () => {
    searchProperties({variables: { name: query }})
  }, [data, query])

  const debouncedChangeHandler = useCallback(
    debounce(changeHandler, 300),
    []
  )

  return (
    <div key="propertiesList">
      <TextField
        sx={{ mb: 2, width: 1, maxWidth: 'sm' }}
        id="property-search"
        label="Search for properties by name..."
        variant="filled"
        onChange={debouncedChangeHandler}
        type="text"
      />
      <TableContainer component={Paper} key="propertiesListTable">
        <Table aria-label="properties listing">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { data && 
              <Records key="propertiesListItems" properties={data.properties} />
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  ) 
};

export default Properties 


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
//
      // <ul className="nav justify-content-end">
      //   <li className="nav-item dropdown">
      //     <Link to="#" className="nav-link" data-bs-toggle="dropdown" role="button" aria-expanded="false">
      //       <i className="bi-three-dots"></i>
      //     </Link>
      //     <ul className="dropdown-menu dropdown-menu-end">
      //       <li><a className="dropdown-item" href="/properties/new">Add</a></li>
      //     </ul>
      //   </li>
      // </ul>
