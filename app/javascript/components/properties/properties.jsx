import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { Container, Accordion, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'

const GET_PROPERTIES = gql`
  query allProperties { 
    properties {
      id
      name
    }
  }
`;

const Properties = () => {
  const { loading, error, data } = useQuery(GET_PROPERTIES)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const records = data.properties.map(({id, name}) => (
    <Accordion.Item key={id} eventKey={id}>
      <Accordion.Header>{name}</Accordion.Header>
      <Accordion.Body>Places</Accordion.Body>
    </Accordion.Item>
  ));

  return (
    <Container>
      <Accordion>
        {records}
      </Accordion>
    </Container>
  ) 
};

export default Properties 


// Todo set this up so that the Accordion.Body instead lists all the units
// for a property
// This will require a units component of some kind, likely set up similar to how
// we've set up properties (e.g. Units.Index, Units.Edit)
