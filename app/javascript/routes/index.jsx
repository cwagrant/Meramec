import React from "react";
import Root from "../components/Root";
import Properties from "../components/Properties";
import Units from "../components/Units";
import Users from "../components/Users";
import RentalAgreements from "../components/RentalAgreements";
import Customers from "../components/Customers";
import Invoices from "../components/Invoices";
import Payments from "../components/Payments";
import ErrorBoundary from "../components/ErrorBoundary";
import * as paths from "../components/PathHelper";
import useAxios from "../components/useAxios";

import { Login, Logout } from "../components/Login";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";

const axios = useAxios();

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route
        path="/"
        errorElement={<ErrorBoundary />}
        element={<Root />}
      >
        <Route
          path="properties"
          element={<Properties />}
          handle={{
            crumb: { name: "Properties" },
          }}
        >
          <Route index element={<Properties.Index />} />
          <Route path="new" element={<Properties.New />} />
          <Route
            path=":propertyId"
            handle={{
              crumb: { name: "{property}" },
            }}
          >
            <Route
              index
              element={<Units.Index />}
            />
            <Route
              path="edit"
              element={<Properties.Edit />}
              handle={{ crumb: { name: "Edit" } }}
            />
            <Route
              path="units"
              element={<Units />}
              handle={{ crumb: { name: "Units" } }}
            >
              <Route index element={<Navigate replace to=".." />} />
              <Route
                path="new"
                element={<Units.New />}
                handle={{ crumb: { name: "New" } }}
              />
              <Route
                path=":unitId"
                element={<Units />}
                handle={{ crumb: { name: "{unit}" } }}
              >
                <Route index element={<Units.Show />} />
                <Route
                  path="edit"
                  element={<Units.Edit />}
                  handle={{ crumb: { name: "Edit" } }}
                />
              </Route>
            </Route>
          </Route>
        </Route>
        <Route
          path="agreements"
          element={<RentalAgreements />}
          handle={{ crumb: { name: "Rental Agreements" } }}
        >
          <Route index element={<RentalAgreements.Index />} />
          <Route
            path="new"
            element={<RentalAgreements.New />}
            handle={{ crumb: { name: "New" } }}
          />
          <Route
            path=":agreementId"
            handle={{ crumb: { name: "{rentalAgreement}" } }}
          >
            <Route index element={<RentalAgreements.Show />} />
            <Route
              path="edit"
              element={<RentalAgreements.Edit />}
              handle={{ crumb: { name: "Edit" } }}
            />
          </Route>
        </Route>
        <Route
          path="payments"
          element={<Payments />}
          errorElement={<ErrorBoundary />}
          handle={{ crumb: { name: "Payments" } }}
        >
          <Route index element={<Payments.Index />} />
          <Route
            path="new"
            element={<Payments.New />}
            handle={{ crumb: { name: "New" } }}
            errorElement={<ErrorBoundary />}
          />
          <Route
            path=":paymentId"
            errorElement={<ErrorBoundary />}
            handle={{ crumb: { name: "{payment}" } }}
          >
            <Route index element={<Payments.Show />} />
            <Route
              path="edit"
              element={<Payments.Edit />}
              errorElement={<ErrorBoundary />}
              handle={{ crumb: { name: "Edit" } }}
            />
          </Route>
        </Route>
        <Route
          path="invoices"
          element={<Invoices />}
          handle={{ crumb: { name: "Invoices" } }}
        >
          <Route index element={<Invoices.Index />} />
          <Route
            path="new"
            element={<Invoices.New />}
            handle={{ crumb: { name: "New" } }}
          />
          <Route
            path=":invoiceId"
            handle={{ crumb: { name: "{invoice}" } }}
          >
            <Route index element={<Invoices.Show />} />
            <Route
              path="edit"
              element={<Invoices.Edit />}
              handle={{ crumb: { name: "Edit" } }}
            />
          </Route>
        </Route>
        <Route
          path="customers"
          element={<Customers />}
          handle={{ crumb: { name: "Customers" } }}
          errorElement={<ErrorBoundary />}
        >
          <Route index element={<Customers.Index />} />
          <Route
            path="new"
            element={<Customers.New />}
            handle={{ crumb: { name: "New" } }}
          />
          <Route
            path=":customerId"
            id="customer"
            handle={{ crumb: { name: "{customer}" } }}
            // loader={async ({ params }) => {
            //   return await axios
            //     .get(paths.API.CUSTOMERS(params.customerId))
            //     .then((res) => {
            //       return res.data;
            //     })
            //     .catch((error) => {
            //       console.log(error);
            //
            //       throw new Response("Not Found", { status: 404 });
            //     });
            // }}
          >
            <Route index element={<Customers.Show />} />
            <Route
              path="edit"
              element={<Customers.Edit />}
              handle={{ crumb: { name: "Edit" } }}
            />
          </Route>
        </Route>
        <Route
          path="users"
          element={<Users />}
          handle={{ crumb: { name: "Users" } }}
        >
          <Route index element={<Users.Index />} />
          <Route
            path="new"
            element={<Users.New />}
            handle={{ crumb: { name: "New" } }}
          />
          <Route
            path=":userId"
            handle={{ crumb: { name: "{user}" } }}
          >
            <Route index element={<Users.Show />} />
            <Route
              path="edit"
              element={<Users.Edit />}
              handle={{ crumb: { name: "Edit" } }}
            />
          </Route>
        </Route>
      </Route>,
    </>,
  ),
);

export default router;
