import React from "react";
import {default as Index} from './Properties'
import Show from './ShowProperty'
import New from './NewProperty'
import Edit from './edit'
import Nav from './navigation'
import { Outlet, useParams } from "react-router-dom"
import { gql, useLazyQuery } from '@apollo/client'
import Breadcrumbs from './breadcrumbs'

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

const Properties = ({ children }) => {
  const { propertyId, unitId } = useParams()

  const [currentProperty, setCurrentProperty] = React.useState({})
  const [currentUnit, setCurrentUnit] = React.useState({})

  const [ loadProperty, { data }] = useLazyQuery(GET_PROPERTY)

  const setProperty = (data) => {
    setCurrentProperty(data.property)
  }

  React.useEffect(() => {
    return () => {
      setCurrentProperty(null)
    }
  }, [])

  React.useEffect(() => {
    if (propertyId) {
      loadProperty({
        variables: { property: propertyId },
        onCompleted: setProperty
      })
    }
  }, [propertyId])
  
  return (
    <div className="property">
      <Breadcrumbs currentProperty={currentProperty} currentUnit={currentUnit} />
      {children}

      <Outlet context={{
        currentProperty, setCurrentProperty,
        currentUnit, setCurrentUnit
      }}/>
    </div>
  )
}

Properties.Index = Index
Properties.Show = Show
Properties.Edit = Edit
Properties.Nav = Nav
Properties.New = New

export default Properties


// Properties.Index needs to have an add-property page added to it. 
// Can we reuse the Edit page for Add? Or do we need separate Add and Edit
// components?
//

// what about doing navigation as breadcrumbs
//
// e.g. Properties / { Property Name } / Units
// or Properties / { Property Name } / Units / { Child }
