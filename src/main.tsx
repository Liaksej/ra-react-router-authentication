import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "@/routes/Root.tsx";
import { action as authAction } from "@/routes/AuthorizationForm.tsx";
import { loader as loaderAuthorized } from "@/routes/Authorized.tsx";
import { Main } from "@/routes/Main.tsx";
import { Header } from "@/routes/Header.tsx";
import { ProviderState } from "@/context/UserContext.tsx";
import { Card, loader as loaderCard } from "@/routes/Card.tsx";
import ErrorPage from "@/error-page.tsx";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          action: authAction,
          element: (
            <>
              <Header />
              <Main />
            </>
          ),
        },
        {
          path: "news",
          loader: loaderAuthorized,
          element: (
            <>
              <Header />
              <Main />
            </>
          ),
        },
        {
          path: "news/:id",
          loader: loaderCard,
          element: (
            <>
              <Header />
              <Card />
            </>
          ),
        },
      ],
    },
  ],
  {
    basename:
      process.env.NODE_ENV === "production"
        ? "/ra-react-router-authentication"
        : "",
  },
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ProviderState>
      <RouterProvider router={router} />
    </ProviderState>
  </React.StrictMode>,
);
