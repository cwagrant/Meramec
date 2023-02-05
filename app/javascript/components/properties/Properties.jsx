import React from 'react'
import { useState, useCallback, useEffect} from 'react'
import { useLazyQuery, gql } from '@apollo/client'
import { Link as RouterLink, useLoaderData } from 'react-router-dom'
import { debounce } from 'lodash'
import { Box, Button, Link, TableContainer, Table, TableRow, TableHead, TableBody, TableCell, TextField, Paper } from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox' 

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
      <TableCell><Link component={RouterLink} to={"/properties/"+id}>{name}</Link></TableCell>
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
        sx={{ width: 1, maxWidth: 'md' }}
        id="property-search"
        label="Search for properties by name..."
        variant="filled"
        onChange={debouncedChangeHandler}
        type="text"
      />
      <Box sx={{my: 1, display: 'flex', justifyContent: 'flex-end', width: 1, maxWidth: 'md'}}> <Box>
          <Button component={RouterLink} to={"./new"} variant="outlined" startIcon={<AddBoxIcon />}>
            New
          </Button>
        </Box>
      </Box>
      <TableContainer component={Paper} sx={{maxWidth: 'md'}} key="propertiesListTable">
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

