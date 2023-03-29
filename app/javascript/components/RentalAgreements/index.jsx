import React from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import useAxios from "../useAxios";
import * as paths from "../PathHelper";
import { useSnackbar } from "notistack";

import { default as Index } from "./RentalAgreements";
import Edit from "./EditRentalAgreement";
import Show from "./RentalAgreement";
import New from "./NewRentalAgreement";
import Breadcrumbs from "../Breadcrumbs";

const RentalAgreements = ({ children }) => {
  const { agreementId } = useParams();
  const [rentalAgreement, setRentalAgreement] = React.useState({});
  const { enqueueSnackbar } = useSnackbar();
  const axios = useAxios(enqueueSnackbar);
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
          enqueueSnackbar(
            `Unable to find rental agreement with id ${agreementId}`,
            {
              variant: "error",
            },
          );
          navigate("/agreements");
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
