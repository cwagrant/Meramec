import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Site from "../components/Site";
import Properties from "../components/properties";
import Header from '../components/Header';
import {Container, Row, Col} from 'react-bootstrap'

export default (
  <Router>
    <Header/>
    <Container>
      <Row>
        <Col md={3}>
          <Properties.Nav />
        </Col>
        <Col>
          <Routes>
            <Route path="/" element={<Site />} />
            <Route path="/properties" element={<Properties />}>
              <Route index element={<Properties.Index />} />
              <Route path=":id" element={<Properties.Show />} />
              <Route path=":id/edit" element={<Properties.Edit />} />
            </Route>
          </Routes>
        </Col>
      </Row>
    </Container>
  </Router>
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
