import type { FC } from "react";

import emuGames from "../data/emuGames.json";

import type { EmuGames, Platforms } from "@/data/EmuGames";

emuGames satisfies EmuGames;

type Props = {
  platform: Platforms;
};

export const EmuGamesList: FC<Props> = ({ platform }) => {
  const data = emuGames[platform];

  return (
    <div>
      <h1 className="text-lg">{data.name}</h1>
    </div>
  );
};
