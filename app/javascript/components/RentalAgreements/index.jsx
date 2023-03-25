import React from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import useAxios from "../useAxios";
import * as paths from "../PathHelper";

import { default as Index } from "./RentalAgreements";
import Edit from "./EditRentalAgreement";
import Show from "./RentalAgreement";
import New from "./NewRentalAgreement";
import Breadcrumbs from "../Breadcrumbs";

const RentalAgreements = ({ children }) => {
  const { agreementId } = useParams();
  const [rentalAgreement, setRentalAgreement] = React.useState({});
  const axios = useAxios();
  const navigate = useNavigate();

  React.useEffect(() => {
    return () => {
      setRentalAgreement(null);
    };
  }, []);

  React.useEffect(() => {
    if (agreementId) {
      axios
        .get(paths.API.RENTAL_AGREEMENTS(agreementId))
        .then((res) => {
          setRentalAgreement(res.data);
        })
        .catch((error) => {
          console.log(error);
          navigate("..", {
            state: [{
              error: "Unable to find Rental Agreement with id " + agreementId,
            }],
          });
        });
    }
  }, [agreementId]);

  return (
    <>
      <Breadcrumbs
        key="crumbs"
        rentalAgreement={rentalAgreement}
      />

      {children}
      <Outlet context={{ rentalAgreement, setRentalAgreement }} />
    </>
  );
};

RentalAgreements.New = New;
RentalAgreements.Index = Index;
RentalAgreements.Edit = Edit;
RentalAgreements.Show = Show;

export default RentalAgreements;
