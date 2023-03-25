import React from "react";
import { default as Index } from "./Properties";
import Show from "./ShowProperty";
import New from "./NewProperty";
import Edit from "./EditProperty";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Breadcrumbs from "../Breadcrumbs";
import { Alert } from "@mui/material";
import { ErrorContext } from "./ErrorContext";
import useAxios from "../useAxios";
import * as paths from "../PathHelper";

const GET_PROPERTY_URL = "/api/properties/";

const Properties = ({ children }) => {
  const { propertyId, unitId } = useParams();

  const [currentProperty, setCurrentProperty] = React.useState({});
  const [currentUnit, setCurrentUnit] = React.useState({});
  const [error, setError] = React.useState({ severity: "", message: "" });
  const navigate = useNavigate();
  const location = useLocation();
  const axios = useAxios();

  React.useEffect(() => {
    return () => {
      setCurrentProperty(null);
    };
  }, []);

  React.useEffect(() => {
    if (propertyId) {
      axios
        .get(`${GET_PROPERTY_URL}${propertyId}`)
        .then((res) => {
          setCurrentProperty(res.data);
        })
        .catch((error) => {
          navigate("/properties", {
            state: [{
              error: "Unable to load property with id " + propertyId,
            }],
          });
        });
    }
  }, [propertyId]);

  return (
    <div className="property">
      <ErrorContext.Provider value={{ error: error, setError: setError }}>
        <Breadcrumbs
          currentProperty={currentProperty}
          currentUnit={currentUnit}
        />
        {children}

        <ErrorContext.Consumer>
          {({ error }) => {
            let { severity, message } = error;

            return (severity.length > 0 && (
              <Alert severity={severity}>{message}</Alert>
            ));
          }}
        </ErrorContext.Consumer>
        {location?.state && location.state.map((data, index) => {
          const key = Object.keys(data)[0];

          return (
            <Alert sx={{ maxWidth: "md", my: 2 }} key={index} severity={key}>
              {data[key]}
            </Alert>
          );
        })}
        <Outlet
          context={{
            currentProperty,
            setCurrentProperty,
            currentUnit,
            setCurrentUnit,
          }}
        />
      </ErrorContext.Provider>
    </div>
  );
};

Properties.Index = Index;
Properties.Show = Show;
Properties.Edit = Edit;
Properties.New = New;

export default Properties;
