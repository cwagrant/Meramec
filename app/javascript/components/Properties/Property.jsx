import React from "react";
import { Outlet, useOutletContext } from "react-router-dom";

const Show = () => {
  const { property, setProperty, unit, setUnit } = useOutletContext();

  return (
    <>
      <Outlet
        context={{
          property,
          setProperty,
          unit,
          setUnit,
        }}
      />
    </>
  );
};

export default Show;
