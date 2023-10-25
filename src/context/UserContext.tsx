import { createContext, Dispatch, useContext } from "react";
import { Action, State, useAuthorizedData } from "@/hooks/useAuthorizedData";

interface UserContextType {
  state: State;
  dispatch: Dispatch<Action>;
}

export const UserContext = createContext<UserContextType>({
  state: {
    authorized: false,
    heading: "",
  },
  dispatch: () => {},
});

export function useUserContext() {
  return useContext(UserContext);
}

export function ProviderState({ children }: { children: React.ReactNode }) {
  const { state, dispatch } = useAuthorizedData();

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}
