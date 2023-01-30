import React from "react";
import {default as Index} from './units'
import Show from './show'
import Edit from './edit'
import NewUnit from './NewUnit'
// import Nav from './navigation'
import { Outlet, useOutletContext } from "react-router-dom"


const Units = ({ children }) => {

  const {currentUnit, setCurrentUnit} = useOutletContext()
  return(
    <>
      {children}
      <Outlet context={{currentUnit, setCurrentUnit}}/>
    </>
  )
}

Units.Index = Index
Units.Show = Show
Units.Edit = Edit
Units.NewUnit = NewUnit
// Units.Nav = Nav

export default Units
