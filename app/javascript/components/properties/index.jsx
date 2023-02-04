// export * from './properties'
// export { default } from './properties'

import React from "react";
import {default as Index} from './properties'
import Show from './show'
import Edit from './edit'
import Nav from './navigation'
import { Outlet, useParams } from "react-router-dom"
import Breadcrumbs from './breadcrumbs'

const Properties = ({ children }) => {
  const { propertyId, unitId } = useParams()

  const [currentProperty, setCurrentProperty] = React.useState({})
  const [currentUnit, setCurrentUnit] = React.useState({})
  
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

export default Properties


// Properties.Index needs to have an add-property page added to it. 
// Can we reuse the Edit page for Add? Or do we need separate Add and Edit
// components?
//

// what about doing navigation as breadcrumbs
//
// e.g. Properties / { Property Name } / Units
// or Properties / { Property Name } / Units / { Child }
