import React from "react";
import {default as Index} from './units'
import Show from './ShowUnit'
import NewUnit from './NewUnit'
import EditUnit from './EditUnit'
// import Nav from './navigation'
import { useLocation, Outlet, useOutletContext, useParams } from "react-router-dom"
import {useLazyQuery, gql} from '@apollo/client'

/* Manages Unit components for display and their shared state.
 *
 */

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

const Units = ({ children }) => {
  const { unitId } = useParams()
  const {currentUnit, setCurrentUnit} = useOutletContext()
  const [ loadUnit, { data }] = useLazyQuery(GET_UNIT)

  const setUnit = (data) => {
    setCurrentUnit(data.unit)
  }

  React.useEffect(() => {
    /* This will run on unmount to clear out Unit state */
    return () => {
      setCurrentUnit(null)
    }
  }, [])


  React.useEffect(() => {
    loadUnit({
      variables: { unit: unitId },
      onCompleted: setUnit
    })

  }, [unitId])


  return(
    <>
      {children}
      <Outlet context={{currentUnit, setCurrentUnit}}/>
    </>
  )
}

Units.Index = Index
Units.Show = Show
Units.Edit = EditUnit
Units.New = NewUnit
// Units.Nav = Nav

export default Units
