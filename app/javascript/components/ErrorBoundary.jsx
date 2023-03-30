import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorBoundary = () => {
  const error = useRouteError();
  console.log(error);
  console.log(error?.status);

  return (
    <>
      <h2>{"There's been an error."}</h2>
      <h1>{error?.status}</h1>
      <p>
        {"Either the page you have requested does not exist or there was an issue displaying the page."}
      </p>
    </>
  );
};

export default ErrorBoundary;
