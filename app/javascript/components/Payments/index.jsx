import React from "react";
import { Outlet, useParams } from "react-router-dom";
import { gql, useLazyQuery } from "@apollo/client";

import { default as Index } from "./Payments";
// import Edit from "./EditRentalAgreement";
// import Show from "./ShowRentalAgreement";
import New from "./NewPayment";

const Payments = ({ children }) => {
  const { paymentId } = useParams();
  const [payment, setPayment] = React.useState();

  // React.useEffect(() => {
  //   if (agreementId) {
  //     loadAgreement({
  //       variables: { id: agreementId },
  //       onCompleted: (data) => {
  //         setRentalAgreement(data.rentalAgreement);
  //       },
  //     });
  //   }
  // }, [agreementId]);

  return <Outlet context={{ payment, setPayment }} />;
};

Payments.New = New;
Payments.Index = Index;
// Payments.Edit = Edit;
// Payments.Show = Show;

export default Payments;
