import { json, Link, Params, redirect, useLoaderData } from "react-router-dom";
import { loader as loaderAuthorized } from "@/routes/Authorized.tsx";

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

export async function loader({ params }: { params: Params }) {
  if (!localStorage.getItem("authorized")) {
    localStorage.removeItem("authorized");
    localStorage.removeItem("user");
    return redirect("/");
  }
  const id = params.id;
  const cardData: Card = await fetch(
    `http://localhost:7070/private/news/${id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authorized")}`,
      },
    },
  ).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw json({ statusText: response.statusText, code: response.status });
    }
  });
  const data = await loaderAuthorized();
  if (data instanceof Response) {
    throw json({ statusText: data.statusText, code: data.status });
  }
  const { userData } = data;
  return { userData, cardData };
}

export function Card() {
  const { cardData } = useLoaderData() as {
    userData: UserData;
    cardData: Card;
  };
  return (
    <Link to={"/news"}>
      <div className="bg-gray-200 w-1/3 p-8 mx-auto mt-6">
        <img src={cardData.image} alt="Картинка" />
        <h2 className="text-2xl font-medium">{cardData.title}</h2>
        <p>{cardData.content}</p>
      </div>
    </Link>
  );
}
