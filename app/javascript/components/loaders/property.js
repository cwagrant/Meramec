import { gql, useQuery } from '@apollo/client'

const GET_PROPERTY = gql`
  query getProperty($property: ID) { 
    property(attributes: {id: $property}) {
      id
      name
      units {
        id
        name
        typeOf
        priceInCents
      }
    }
  }
`;

export default ({params}) => {

  return params
}
