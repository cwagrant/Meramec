import React from 'react'
import { useState, useCallback, useEffect} from 'react'
import { useLazyQuery, gql } from '@apollo/client'
import { Link as RouterLink } from 'react-router-dom'
import { debounce } from 'lodash'
import { Box, Button, Link, TableContainer, Table, TableRow, TableHead, TableBody, TableCell, TextField, Paper } from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox' 
import LaunchIcon from '@mui/icons-material/Launch';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const GET_CUSTOMERS = gql`
  query allCustomers($name: String) { 
    customers(attributes: { name: $name }) {
      id
      name
      firstName
      lastName
    }
  }
`;

const Records = ({customers}) => {
  return customers.map(({id, firstName, lastName}) => (
    <TableRow key={id}>
      <TableCell>{id}</TableCell>
      <TableCell>
        <Link component={RouterLink} to={"/customers/"+id}>
          {firstName} {lastName}
        </Link>
      </TableCell>
      <TableCell>
        <Box sx={{display: 'flex', justifyContent: 'space-evenly'}}>
          <Link component={RouterLink} to={"/customers/"+id}>
            <LaunchIcon />
          </Link>
          <Link component={RouterLink} to={"/customers/"+id+"/edit"}>
            <EditIcon />
          </Link>
          <Link component={RouterLink} to={"/customers/"+id} >
            <DeleteIcon />
          </Link>
        </Box>
      </TableCell>
    </TableRow>
  ));
}

const Customers = () => {
  const [ query, setQuery ] = useState("")
  const [ searchCustomers, { data }] = useLazyQuery(GET_CUSTOMERS)

  const changeHandler = event => {
    setQuery(event.target.value) 
  }

  useEffect( () => {
    searchCustomers({variables: { name: query }})
  }, [data, query])

  const debouncedChangeHandler = useCallback(
    debounce(changeHandler, 300),
    []
  )

  return (
    <div key="customersList">
      <TextField
        sx={{ width: 1, maxWidth: 'md' }}
        id="customer-search"
        label="Search for customers by name..."
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
        <Table aria-label="customers listing">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            { data && 
              <Records key="customersListItems" customers={data.customers} />
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  ) 
};

export default Customers
