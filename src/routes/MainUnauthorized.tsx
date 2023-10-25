import { useContext } from "react";
import { UserContext } from "@/context/UserContext.tsx";

const PARAGRAPH_TEXT = "Facebook & VK killer.";

export const MainUnauthorized = () => {
  const context = useContext(UserContext);

  return (
    <section className="bg-gray-200 w-2/3 mx-auto my-6 p-16 ">
      <h2 className="text-5xl font-medium">{context.state.heading}</h2>
      <p className="text-2xl pt-2">{PARAGRAPH_TEXT}</p>
    </section>
  );
};
