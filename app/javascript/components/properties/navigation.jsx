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
    <LinkContainer to={'/properties/' + id} key={id}>
      <Nav.Link to={'/properties/' + id}>{name}</Nav.Link>
    </LinkContainer>
  ));

  return(
    <Nav defaultActiveKey="/properties" className="flex-column">
      <LinkContainer to ="/properties">
        <Nav.Link href="/properties">All</Nav.Link>
      </LinkContainer>
      { records }
    </Nav>
  )
}

export default navigation
