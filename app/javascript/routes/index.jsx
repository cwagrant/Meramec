import React from "react";
import Root from "../components/Root";
import Properties from "../components/properties";
import Units from "../components/units";
import RentalAgreements from "../components/RentalAgreements";
import Customers from "../components/Customers";
import Payments from "../components/Payments";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
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
      <Route path="agreements" element={<RentalAgreements />}>
        <Route index element={<RentalAgreements.Index />} />
        <Route
          path="new"
          element={<RentalAgreements.New />}
          handle={{ crumb: { name: "New" } }}
        />
        <Route path=":agreementId" element={<RentalAgreements />}>
          <Route index element={<RentalAgreements.Show />} />
          <Route path="edit" element={<RentalAgreements.Edit />} />
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
      <Route path="customers" element={<Customers />}>
        <Route index element={<Customers.Index />} />
        <Route
          path="new"
          element={<Customers.New />}
          handle={{ crumb: { name: "New" } }}
        />
        <Route path=":customerId" element={<Customers />}>
          <Route index element={<Customers.Show />} />
          <Route path="edit" element={<Customers.Edit />} />
        </Route>
      </Route>
    </Route>,
  ),
);

export default router;
//TODO 23-02-05
// change the properties and units index managers into loaders from react
// router. Then use those in place of the currentUnit and currentProperty
// states
//
// Update:
// While it would be nice to use the loader, it does not work with hooks,
// specifically apollo client useQuery hooks. While we could do a direct
// .query it apparently means that it won't interact properly with the cache
// so that we'll essentially be managing things like we already do.
//
// This appears to be a still relatively new issue so likely I'll need to
// either create my own solution or wait for the Apollo team and ReactRouter
// teams to figure out how the loader should work with Apollo.
//
// Once that is figured out we should be able to use the loader and then
// make use of the data from the loader to better generate breadcrumbs.
