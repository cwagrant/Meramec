import * as React from "react";

import { RouterProvider } from "react-router-dom";
import MyRoutes from "../routes";

// Need to make this layout into the <Site /> and then
// use an Outlet for our children
export default () => {
  return <RouterProvider router={MyRoutes} />;
};
