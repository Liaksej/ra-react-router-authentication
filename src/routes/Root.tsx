import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "@/context/UserContext.tsx";

export default function Root() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = useContext(UserContext);

  const isNewsPage = /^\/news\/[A-Za-z0-9-]+$/.test(location.pathname);

  useEffect(() => {
    if (state.authorized && location.pathname === "/") {
      navigate("/news");
    }
    if (!state.authorized && location.pathname === "/news") {
      navigate("/");
    }
    if (state.authorized && isNewsPage) {
      navigate(location.pathname);
    }
    if (!state.authorized && isNewsPage) {
      navigate("/");
    }
  }, [state.authorized, location.pathname]);
  return (
    <div>
      <Outlet />
    </div>
  );
}
