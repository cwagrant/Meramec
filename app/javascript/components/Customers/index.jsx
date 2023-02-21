import React from "react";
import { Outlet, useParams } from "react-router-dom";
import { gql, useLazyQuery } from "@apollo/client";
import { default as Index } from "./Customers";
import Show from "./ShowCustomer";
import Edit from "./EditCustomer";
import New from "./NewCustomer";

const GET_CUSTOMER = gql`
  query getCustomer($id: ID) {
    customer(attributes: {id: $id}) {
      id
      name
      firstName
      lastName
      email
      gateCode
    }
  }
`;
const Customers = ({ children }) => {
  const { customerId } = useParams();
  const [customer, setCustomer] = React.useState();
  const [loadCustomer, { customerData }] = useLazyQuery(GET_CUSTOMER);

  React.useEffect(() => {
    if (customerId) {
      loadCustomer({
        variables: { id: customerId },
        onCompleted: (data) => {
          setCustomer(data.customer);
        },
      });
    }
  }, [customerId]);

  return (
    <>
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
