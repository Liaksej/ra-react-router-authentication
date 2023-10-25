import { useLocation } from "react-router-dom";
import { Authorized } from "@/routes/Authorized.tsx";
import { AuthorizationForm } from "@/routes/AuthorizationForm.tsx";
import { useUserContext } from "@/context/UserContext.tsx";

export const Header = () => {
  const location = useLocation();
  const { state } = useUserContext();

  const isNewsPage = /^\/news\/[A-Za-z0-9-]+$/.test(location.pathname);

  return (
    <header className="flex items-center justify-between p-4 bg-gray-100">
      <h1 className="text-2xl">{state.heading}</h1>
      {location.pathname === "/news" || isNewsPage ? (
        <Authorized />
      ) : (
        <AuthorizationForm />
      )}
    </header>
  );
};
