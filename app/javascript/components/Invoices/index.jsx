import React from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { default as Index } from "./Invoices";
import Show from "./Invoice";
import Edit from "./EditInvoice";
import New from "./NewInvoice";
import Breadcrumbs from "../Breadcrumbs";
import useAxios from "../useAxios";
import * as paths from "../PathHelper";
import { useSnackbar } from "notistack";

const Invoices = ({ children }) => {
  const { invoiceId } = useParams();
  const [invoice, setInvoice] = React.useState();
  const { enqueueSnackbar } = useSnackbar();
  const axios = useAxios(enqueueSnackbar);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (invoiceId) {
      axios
        .get(paths.API.INVOICES(invoiceId))
        .then((res) => {
          setInvoice(res.data);
        })
        .catch((error) => {
          enqueueSnackbar(`Unable to load invoice with id ${invoiceId}`, {
            variant: "error",
          });
          navigate("/invoices");
        });
    }
  }, [invoiceId]);

  return (
    <>
      <Breadcrumbs
        key="crumbs"
        invoice={invoice}
      />
      {children}
      <Outlet context={{ invoice, setInvoice }} />
    </>
  );
};

Invoices.Index = Index;
Invoices.Show = Show;
Invoices.Edit = Edit;
Invoices.New = New;

export default Invoices;
