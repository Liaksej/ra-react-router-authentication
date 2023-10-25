import { useRouteError } from "react-router-dom";
import { useEffect } from "react";

export default function ErrorPage() {
  const error = useRouteError() as
    | Error
    | { data: { statusText: string; code: number } }
    | { status: string; statusText: string };
  console.error(error);

  useEffect(() => {
    if ("data" in error && error.data.code === 401) {
      localStorage.removeItem("authorized");
      localStorage.removeItem("user");
    }
  }, [error]);

  return (
    <div
      id="error-page"
      className="w-screen h-screen flex flex-col items-center justify-center"
    >
      <h1 className="text-2xl">Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>
          {"data" in error &&
          typeof error.data === "object" &&
          error.data !== null
            ? `${error.data.statusText} ${error.data.code}`
            : "message" in error
            ? error.message
            : "statusText" in error
            ? `${error.statusText} ${error.status}`
            : ""}
        </i>
      </p>
    </div>
  );
}
