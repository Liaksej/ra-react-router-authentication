import { Form, json, redirect } from "react-router-dom";
import { Button } from "@/routes/Button.tsx";
import { useContext, useEffect } from "react";
import { UserContext } from "@/context/UserContext.tsx";

const PLACEHOLDER_USERNAME = "Username";
const PLACEHOLDER_PASSWORD = "Password";
const URL_AUTH = "http://localhost:7070/auth";

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const response = await fetch(URL_AUTH, {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const result: { token: string } | null = await response.json();
    if (result) {
      localStorage.setItem("authorized", result.token);
      return redirect("/news");
    } else {
      throw json({ statusText: response.statusText, code: response.status });
    }
  }
  return redirect("/");
}

export const AuthorizationForm = () => {
  const { dispatch } = useContext(UserContext);

  useEffect(() => {
    const authorized = localStorage.getItem("authorized");
    if (authorized) {
      dispatch({ type: "authorized" });
    }
  }, [dispatch]);

  return (
    <Form className="flex gap-2" method="post">
      <input
        name="login"
        className="p-2 rounded"
        placeholder={PLACEHOLDER_USERNAME}
      />
      <input
        name="password"
        className="p-2 rounded"
        placeholder={PLACEHOLDER_PASSWORD}
      />
      <Button />
    </Form>
  );
};
