import React from "react"
import { Nav } from 'react-bootstrap'
import { useQuery, gql } from '@apollo/client'
import { LinkContainer } from 'react-router-bootstrap'

const GET_PROPERTIES = gql`
  query allProperties { 
    properties {
      id
      name
    }
  }
`;

const navigation = () => {
  const { loading, error, data } = useQuery(GET_PROPERTIES)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const records = data.properties.map(({id, name}) => (
      <Nav.Link key={id} href={'/properties/' + id}>{name}</Nav.Link>
  ));

  return(
    <Nav className="mt-2 property-nav flex-column">
      <Nav.Link href="/properties">All</Nav.Link>
      { records }
    </Nav>
  )
}

export default navigation
