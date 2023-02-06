import React from "react"
import { Outlet } from "react-router-dom"
import { gql, useLazyQuery } from '@apollo/client'

const GET_AGREEMENT = gql`
  query getRentalAgreement($id: ID) {
    rentalAgreement(attributes: {id: $id}) {
      id
      unit {
        id
        name
      }
    }
  }
`
const RentalAgreements = ({children }) => {

  return (
    <Outlet />
  )
}

export default RentalAgreements

