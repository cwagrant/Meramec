import React from "react";
import { default as Index } from "./Units";
import Show from "./Unit";
import NewUnit from "./NewUnit";
import EditUnit from "./EditUnit";
import useAxios from "../useAxios";
import {
  Outlet,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";

const GET_UNIT_URL = "/api/units/";

const Units = ({ children }) => {
  const { unitId } = useParams();
  const { currentUnit, setCurrentUnit } = useOutletContext();
  const navigate = useNavigate();
  const axios = useAxios();

  const setUnit = (data) => {
    setCurrentUnit(data.unit);
  };

  React.useEffect(() => {
    /* This will run on unmount to clear out Unit state */
    return () => {
      setCurrentUnit(null);
    };
  }, []);

  React.useEffect(() => {
    if (unitId) {
      axios
        .get(`${GET_UNIT_URL}${unitId}`)
        .then((res) => {
          const id = res.data.id;
          setCurrentUnit(res.data);
        })
        .catch((error) => {
          console.log(error);
          navigate("..", {
            state: [{ error: "Unable to find unit with id " + unitId }],
          });
        });
    }
  }, [unitId]);

  return (
    <>
      {children}
      <Outlet context={{ currentUnit, setCurrentUnit }} />
    </>
  );
};

Units.Index = Index;
Units.Show = Show;
Units.Edit = EditUnit;
Units.New = NewUnit;
// Units.Nav = Nav

export default Units;
