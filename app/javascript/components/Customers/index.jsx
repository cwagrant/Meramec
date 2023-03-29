import React from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { default as Index } from "./Customers";
import Show from "./Customer";
import Edit from "./EditCustomer";
import New from "./NewCustomer";
import Breadcrumbs from "../Breadcrumbs";
import useAxios from "../useAxios";
import * as paths from "../PathHelper";
import { useSnackbar } from "notistack";

const Customers = ({ children }) => {
  const { customerId } = useParams();
  const [customer, setCustomer] = React.useState();
  const { enqueueSnackbar } = useSnackbar();
  const axios = useAxios(enqueueSnackbar);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (customerId) {
      axios
        .get(paths.API.CUSTOMERS(customerId))
        .then((res) => {
          setCustomer(res.data);
        })
        .catch((error) => {
          enqueueSnackbar(`Unable to load customer with id ${customerId}`, {
            variant: "error",
          });
          navigate("/customers");
        });
    }
  }, [customerId]);

  return (
    <>
      <Breadcrumbs
        key="crumbs"
        customer={customer}
      />
      {children}
      <Outlet context={{ customer, setCustomer }} />
    </>
  );
};

Customers.Index = Index;
Customers.Show = Show;
Customers.Edit = Edit;
Customers.New = New;

export default Customers;
