import emuGames from "../data/emuGames";

import { GameList } from "./GameList";

import type { EmuPlatformName } from "@data/emuGames";
import type { FC } from "react";

type Props = {
  platform: EmuPlatformName;
};

export const EmuGamesList: FC<Props> = ({ platform }) => {
  const platformData = emuGames[platform];

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-semibold">{platformData.displayName}</h1>
      {platformData.groups.map((group) => (
        <div key={group.name}>
          <h2 className="mb-6 text-xl">{group.name}</h2>
          <div className="ml-4 flex flex-col gap-3">
            <GameList games={group.main} platform={platform} />
            {group.romhacks.length > 0 && <h3>Romhacks</h3>}
            <GameList games={group.romhacks} platform={platform} />
          </div>
        </div>
      ))}
    </div>
  );
};
