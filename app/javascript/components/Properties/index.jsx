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
import { useSnackbar } from "notistack";

const GET_PROPERTY_URL = "/api/properties/";

const Properties = ({ children }) => {
  const { propertyId, unitId } = useParams();

  const [currentProperty, setCurrentProperty] = React.useState({});
  const [currentUnit, setCurrentUnit] = React.useState({});
  const [error, setError] = React.useState({ severity: "", message: "" });
  const navigate = useNavigate();
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const axios = useAxios(enqueueSnackbar);

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
          enqueueSnackbar(`Unable to load property with id ${propertyId}`, {
            variant: "error",
          });
          navigate("/properties");
        });
    }
  }, [propertyId]);

  return (
    <div className="property">
      <Breadcrumbs
        currentProperty={currentProperty}
        currentUnit={currentUnit}
      />
      <Outlet
        context={{
          currentProperty,
          setCurrentProperty,
          currentUnit,
          setCurrentUnit,
        }}
      />
    </div>
  );
};

Properties.Index = Index;
Properties.Show = Show;
Properties.Edit = Edit;
Properties.New = New;

export default Properties;
