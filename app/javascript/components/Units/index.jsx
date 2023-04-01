import React from "react";
import { default as Index } from "./Units";
import Show from "./Unit";
import NewUnit from "./NewUnit";
import EditUnit from "./EditUnit";
import useAxios from "../useAxios";
import { useSnackbar } from "notistack";
import {
  Outlet,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";

const GET_UNIT_URL = "/api/units/";

const Units = ({ children }) => {
  const { unitId } = useParams();
  const { unit, setUnit } = useOutletContext();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const axios = useAxios(enqueueSnackbar);

  React.useEffect(() => {
    /* This will run on unmount to clear out Unit state */
    return () => {
      setUnit(null);
    };
  }, []);

  React.useEffect(() => {
    if (unitId) {
      axios
        .get(`${GET_UNIT_URL}${unitId}`)
        .then((res) => {
          setUnit(res.data);
        })
        .catch((error) => {
          enqueueSnackbar(`Unable to find Unit with id ${unitId}`, {
            variant: "error",
          });
          navigate("..");
        });
    }
  }, [unitId]);

  return (
    <>
      {children}
      <Outlet context={{ unit, setUnit }} />
    </>
  );
};

Units.Index = Index;
Units.Show = Show;
Units.Edit = EditUnit;
Units.New = NewUnit;
// Units.Nav = Nav

export default Units;
