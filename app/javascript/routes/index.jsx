import React from "react";
import Root from "../components/Root";
import Properties from "../components/Properties";
import Units from "../components/Units";
import Users from "../components/Users";
import RentalAgreements from "../components/RentalAgreements";
import Customers from "../components/Customers";
import Payments from "../components/Payments";

import { Login, Logout } from "../components/Login";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";
const user_json = localStorage.getItem("user");
const jwtToken = user_json ? JSON.parse(user_json).token : null;
// perhaps we can use a useeffect hook to make it so that when
// the page initially loads we run a current_user check
// and then if we can't hit it we redirect
//
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route
        path="/"
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
            element={<Properties.Show />}
            handle={{
              crumb: { name: "{property}" },
            }}
          >
            <Route index element={<Units.Index />} />
            <Route path="edit" element={<Properties.Edit />} />
            <Route path="units" element={<Units />}>
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
                <Route path="edit" element={<Units.Edit />} />
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
            />
          </Route>
        </Route>
        <Route path="payments" element={<Payments />}>
          <Route index element={<Payments.Index />} />
          <Route
            path="new"
            element={<Payments.New />}
            handle={{ crumb: { name: "New" } }}
          />
          <Route path=":paymentId" element={<Payments />}>
            <Route index element={<Payments.Show />} />
            <Route path="edit" element={<Payments.Edit />} />
          </Route>
        </Route>
        <Route
          path="customers"
          element={<Customers />}
          handle={{ crumb: { name: "Customers" } }}
        >
          <Route index element={<Customers.Index />} />
          <Route
            path="new"
            element={<Customers.New />}
            handle={{ crumb: { name: "New" } }}
          />
          <Route
            path=":customerId"
            handle={{ crumb: { name: "{customer}" } }}
          >
            <Route index element={<Customers.Show />} />
            <Route path="edit" element={<Customers.Edit />} />
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
            <Route path="edit" element={<Users.Edit />} />
          </Route>
        </Route>
      </Route>,
    </>,
  ),
);

export default router;
