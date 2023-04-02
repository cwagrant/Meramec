import React from "react";
import { default as Index } from "./Properties";
import Show from "./Property";
import New from "./NewProperty";
import Edit from "./EditProperty";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import Breadcrumbs from "../Breadcrumbs";
import useAxios from "../useAxios";
import * as paths from "../PathHelper";
import { useSnackbar } from "notistack";

const Properties = ({ children }) => {
  const { propertyId, unitId } = useParams();

  const [property, setProperty] = React.useState({});
  const [unit, setUnit] = React.useState({});
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const axios = useAxios(enqueueSnackbar);

  React.useEffect(() => {
    if (propertyId) {
      axios
        .get(paths.API.PROPERTIES(propertyId))
        .then((res) => {
          setProperty(res.data);
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
        property={property}
        unit={unit}
      />
      <Outlet
        context={{
          property,
          setProperty,
          unit,
          setUnit,
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
