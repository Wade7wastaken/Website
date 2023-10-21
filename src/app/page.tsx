import { redirect } from "next/navigation";
import type { FC } from "react";

const Home: FC = () => {
  redirect("/games/web");
};

export default Home;
