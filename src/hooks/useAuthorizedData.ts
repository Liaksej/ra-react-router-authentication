import { useEffect, useReducer } from "react";

const HEADING = "Neto Social";

export interface State {
  authorized: boolean;
  heading: string;
}

type ActionAuthorization = {
  type: "authorized" | "unauthorized";
};

export type Action = ActionAuthorization;

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "authorized":
      return { ...state, authorized: true };
    case "unauthorized":
      return { ...state, authorized: false };
    default:
      return state;
  }
}

export const useAuthorizedData = () => {
  const [state, dispatch] = useReducer(reducer, {
    authorized: false,
    heading: HEADING,
  });

  useEffect(() => {
    const authorized = localStorage.getItem("authorized");
    if (authorized) {
      dispatch({ type: "authorized" });
    } else {
      localStorage.removeItem("authorized");
      localStorage.removeItem("user");
      dispatch({ type: "unauthorized" });
    }
  }, []);

  return { state, dispatch };
};
