import { useLocation } from "react-router-dom";
import { MainAuthorized } from "@/routes/MainAuthorized.tsx";
import { MainUnauthorized } from "@/routes/MainUnauthorized.tsx";

export const Main = () => {
  const location = useLocation();
  return (
    <main>
      {location.pathname === "/news" ? (
        <MainAuthorized />
      ) : (
        <MainUnauthorized />
      )}
    </main>
  );
};
