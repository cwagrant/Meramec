import React from "react";
import { Outlet, useParams } from "react-router-dom";

import { default as Index } from "./Payments";
import Edit from "./EditPayment";
import Show from "./Payment";
import New from "./NewPayment";
import useAxios from "../useAxios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import * as paths from "../PathHelper";
import Breadcrumbs from "../Breadcrumbs";

const Payments = ({ children }) => {
  const { paymentId } = useParams();
  const [payment, setPayment] = React.useState();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const axios = useAxios(enqueueSnackbar);

  React.useEffect(() => {
    if (paymentId) {
      axios
        .get(paths.API.PAYMENTS(paymentId))
        .then((res) => {
          setPayment(res.data);
        })
        .catch((error) => {
          enqueueSnackbar(`Unable to load payment with id ${paymentId}`, {
            variant: "error",
          });
          navigate("/payments");
        });
    }
  }, [paymentId]);

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

  return (
    <>
      <Breadcrumbs
        payment={payment}
      />

      <Outlet context={{ payment, setPayment }} />
    </>
  );
};

Payments.New = New;
Payments.Index = Index;
Payments.Edit = Edit;
Payments.Show = Show;

export default Payments;
