import React from "react";
import { Routes, Route } from "react-router-dom";
import Site from "../components/Site";
import Properties from "../components/properties";
import Units from "../components/units";

export default (
  <Routes>
    <Route path="/" element={<Site />} />

    <Route path="/properties" element={<Properties />}>
      <Route index element={<Properties.Index />} />
      <Route path="new" element={<Properties.New />} />
      <Route path=":propertyId" element={<Properties.Show />}>
        <Route index element={<Units.Index />} />
        <Route path="edit" element={<Properties.Edit />} />
        <Route path="units" element={<Units />}>
          <Route index element={<Units.Index />} />
          <Route path="new" element={<Units.New />} />
          <Route path=":unitId" element={<Units />}>
            <Route index element={<Units.Show />} />
            <Route path="edit" element={<Units.Edit />}/>
          </Route>
        </Route>
      </Route>
    </Route>
  </Routes>
)

// TODO
// We're going to set up a vertical nav of properties that
// will then, when clicked, display an index of all the available
// units for that property along w/ CRUD for the units.
//
// Need to setup CRUD for Properties as well. This will require setting up some
// basic mutations for the graphql api
//
// Should components be placed in folders for keeping them separate? I'm thinking so.
// <Route index element={<Units/>} />
// <Route path="units" element={<Units/>} />
// <Route path="*" element={<NoMatch />} />
