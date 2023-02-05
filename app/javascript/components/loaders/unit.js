const { gql, useQuery } from '@apollo/client'

const GET_UNIT = gql`
  query getUnit($unit: ID) {
    unit(attributes: {id: $unit}) {
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

export default ({params}) => {
  const { data } = useQuery(GET_UNIT, 
    {
      variables: { unit: params.unitId },
    }
  )

  return data.unit
}
