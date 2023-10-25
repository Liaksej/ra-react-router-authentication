import { Link, useLoaderData } from "react-router-dom";

import { Card } from "@/routes/Card.tsx";

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

export const CardsList = () => {
  const { cards } = useLoaderData() as {
    userData: UserData;
    cards: Card[];
  };

  if (!cards) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex gap-2 pt-6 flex-wrap justify-center">
      {cards.map((card) => {
        return (
          <Link to={`/news/${card.id}`} className="block w-1/3" key={card.id}>
            <div className="bg-gray-200 p-8 h-full">
              <img src={card.image} alt="Картинка" />
              <h2 className="text-2xl font-medium">{card.title}</h2>
              <p>{card.content}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
