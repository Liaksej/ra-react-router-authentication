import { useContext } from "react";
import { UserContext } from "@/context/UserContext.tsx";

const BUTTON_TEXT = {
  login: "Login",
  logout: "Logout",
};

export const Button = ({ onClick }: { onClick?: () => void }) => {
  const context = useContext(UserContext);

  return (
    <button
      type="submit"
      onClick={() => onClick && onClick()}
      className={`p-2 border-2 border-solid rounded ${
        context.state.authorized
          ? "border-red-500 text-red-500"
          : "border-emerald-500 text-emerald-500"
      }`}
    >
      {context.state.authorized ? BUTTON_TEXT.logout : BUTTON_TEXT.login}
    </button>
  );
};
