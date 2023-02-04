import React from 'react'
import { useQuery, gql } from '@apollo/client'
import  { Outlet, useOutletContext, useParams } from 'react-router-dom'

const GetProperty = gql`
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

const Show = () => { 
  const { propertyId } = useParams()
  const {currentProperty, setCurrentProperty} = useOutletContext()
  const {currentUnit, setCurrentUnit} = useOutletContext()

  const setProperty = (data) => {
    setCurrentProperty(data.property)
    setCurrentUnit(null)
  }

  const { loading, error, data } = useQuery(GetProperty, 
    { 
      variables: { property: propertyId },
      onCompleted: setProperty
    },
  )

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return ( 
    <>
      <Outlet context={{currentProperty, setCurrentProperty, currentUnit, setCurrentUnit}}/>
    </>
  )


}

export default Show

