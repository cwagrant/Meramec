import React from "react";
import {default as Index} from './Properties'
import Show from './ShowProperty'
import New from './NewProperty'
import Edit from './EditProperty'
import Nav from './navigation'
import { Outlet, useParams, useNavigate, useLocation } from "react-router-dom"
import { gql, useLazyQuery } from '@apollo/client'
import Breadcrumbs from '../Breadcrumbs'
import { Alert } from '@mui/material'
import { ErrorContext } from './ErrorContext'
// probably make the ErrorContext into some kind of sitewide alert system 
// a-la flash in Rails

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
  const [error, setError] = React.useState({severity: '', message: ''})
  const navigate = useNavigate()
  const location = useLocation()

  const [ loadProperty, { data }] = useLazyQuery(GET_PROPERTY)

  React.useEffect(() => {
    return () => {
      setCurrentProperty(null)
    }
  }, [])

  React.useEffect(() => {
    if (propertyId) {
      loadProperty({
        variables: { property: propertyId },
        onCompleted: (data) => { setCurrentProperty(data.property) },
        onError: () => {
          navigate('/properties', { state: [{error: 'Unable to load property with id ' + propertyId }]})
        }
      })
    }
  }, [propertyId])
  
  return (
    <div className="property">
      <ErrorContext.Provider value={{error: error, setError: setError}}>
        <Breadcrumbs currentProperty={currentProperty} currentUnit={currentUnit} />
        {children}

        <ErrorContext.Consumer>
          { ({error}) => {
            let {severity, message} = error

            return (severity.length > 0 && <Alert severity={severity}>{message}</Alert>)}
          }
        </ErrorContext.Consumer>
        { location?.state && location.state.map((data, index) => {
          const key = Object.keys(data)[0]

          return (
            <Alert sx={{maxWidth: 'md', my: 2}} key={index} severity={key}>{data[key]}</Alert>
          )
        })}
        <Outlet context={{
          currentProperty, setCurrentProperty,
          currentUnit, setCurrentUnit
        }}/>
      </ErrorContext.Provider>
    </div>
  )
}

Properties.Index = Index
Properties.Show = Show
Properties.Edit = Edit
Properties.Nav = Nav
Properties.New = New

export default Properties

