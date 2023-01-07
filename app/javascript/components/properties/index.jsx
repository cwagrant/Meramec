// export * from './properties'
// export { default } from './properties'

import React from "react";
import {default as Index} from './properties'
import Show from './show'
import Edit from './edit'
import Nav from './navigation'
import { Outlet } from "react-router-dom"

const Properties = ({ children }) => (
  <>
    {children}
    <Outlet />
  </>
)
Properties.Index = Index
Properties.Show = Show
Properties.Edit = Edit
Properties.Nav = Nav

export default Properties
