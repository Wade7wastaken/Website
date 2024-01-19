import { type FC } from "react";

import emuGames from "../data/emuGames";

import type { EmuGame, EmuPlatformName } from "@data/emuGames";

interface Props {
  platform: EmuPlatformName;
}

const constructGameUrl = (romLocation: string, platform: string): string =>
  `/play?rom=${romLocation}&platform=${platform}`;

export const EmuGamesList: FC<Props> = ({ platform }) => {
  const platformData = emuGames[platform];

  // use regular a tags for this because we need a full page reload for most
  // emulators
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

const GameList: FC<{
  platform: EmuPlatformName;
  games: EmuGame[];
}> = ({ platform, games }) => {
  return (
    <ul className="list-inside list-disc">
      {games.map(({ title, internalName }) => (
        <li key={internalName}>
          <a href={constructGameUrl(internalName, platform)}>{title}</a>
        </li>
      ))}
    </ul>
  );
};
