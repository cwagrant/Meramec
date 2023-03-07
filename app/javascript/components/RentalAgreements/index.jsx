import React from "react";
import { Outlet, useParams } from "react-router-dom";
import { gql, useLazyQuery } from "@apollo/client";

import { default as Index } from "./RentalAgreements";
import Edit from "./EditRentalAgreement";
import Show from "./ShowRentalAgreement";
import New from "./NewRentalAgreement";

const GET_AGREEMENT = gql`
  query getRentalAgreement($id: ID) {
    rentalAgreement(attributes: {id: $id}) {
      id
      unit {
        id
        name
      }
      customer {
        id
        lastName
        firstName
        gateCode
        email
        formalName
      }
    }
  }
`;
const RentalAgreements = ({ children }) => {
  const { agreementId } = useParams();
  const [rentalAgreement, setRentalAgreement] = React.useState();
  const [loadAgreement, { agreementData }] = useLazyQuery(GET_AGREEMENT);

  React.useEffect(() => {
    if (agreementId) {
      loadAgreement({
        variables: { id: agreementId },
        onCompleted: (data) => {
          setRentalAgreement(data.rentalAgreement);
        },
      });
    }
  }, [agreementId]);

  return <Outlet context={{ rentalAgreement, setRentalAgreement }} />;
};

RentalAgreements.New = New;
RentalAgreements.Index = Index;
RentalAgreements.Edit = Edit;
RentalAgreements.Show = Show;

export default RentalAgreements;
