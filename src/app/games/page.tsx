import { redirect } from "next/navigation";
import type { FC } from "react";

const Games: FC = () => {
  redirect("/games/web");
};

export default Games;
