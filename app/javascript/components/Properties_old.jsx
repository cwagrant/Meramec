import React from 'react'
import { useQuery, gql } from '@apollo/client';
import { Container, Table } from 'react-bootstrap'

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

  records = data.properties.map(({id, name}) => (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
    </tr>
  ));

  return (
    <Container>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {records}
        </tbody>
      </Table>
    </Container>
  ) 
};

export default Properties
