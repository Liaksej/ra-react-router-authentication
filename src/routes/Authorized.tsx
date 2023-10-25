import { useContext } from "react";
import { UserContext } from "@/context/UserContext.tsx";
import { Button } from "@/routes/Button.tsx";
import { json, useLoaderData } from "react-router-dom";

const HELLO_TEXT = "Hello, ";

interface UserData {
  id: string;
  login: string;
  name: string;
  avatar: string;
}

interface Card {
  id: string;
  title: string;
  image: string;
  content: string;
}

export async function loader() {
  if (!localStorage.getItem("authorized")) {
    throw json({ statusText: "Unauthorized", code: 401 });
  }

  const token = localStorage.getItem("authorized");
  const data: string | null | undefined = localStorage.getItem("user");
  let userData;
  if (data) {
    userData = JSON.parse(data);
  } else {
    userData = await fetch("http://localhost:7070/private/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw json({
            statusText: response.statusText,
            code: response.status,
          });
        }
      })
      .then((data) => {
        localStorage.setItem("user", JSON.stringify(data));
        return data;
      });
  }
  const cards: Card[] | null | undefined = await fetch(
    "http://localhost:7070/private/news",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  ).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw json({ statusText: response.statusText, code: response.status });
    }
  });
  return { userData, cards };
}

export const Authorized = () => {
  const context = useContext(UserContext);
  const { userData } = useLoaderData() as {
    userData: UserData;
    cards: Card[];
  };

  function unauthorizedHandler() {
    context.dispatch({ type: "unauthorized" });
    localStorage.removeItem("authorized");
    localStorage.removeItem("user");
  }

  return (
    <div className="flex gap-2">
      <span className="py-2 text-gray-800">{HELLO_TEXT + userData.name}</span>
      <img src={userData.avatar} alt={userData.name} className="rounded-full" />
      <Button onClick={unauthorizedHandler} />
    </div>
  );
};
