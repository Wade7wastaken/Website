import { Fragment, type FC } from "react";

import emuGames from "../data/emuGames.json";

import type { EmuGames, Platforms } from "@data/EmuGames";

emuGames satisfies EmuGames;

interface Props {
  platform: Platforms;
}

const constructGameUrl = (romLocation: string, platform: string): string =>
  `/play?rom=${romLocation}&platform=${platform}`;

export const EmuGamesList: FC<Props> = ({ platform }) => {
  const data = emuGames[platform];

  // use regular a tags for this because we need a full page reload for most
  // emulators
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-semibold">{data.name}</h1>
      {Object.entries(data.games).map(([gameName, categories]) => (
        <div key={gameName}>
          <h2 className="text-xl mb-6">{gameName}</h2>
          <div className="ml-4 flex flex-col gap-3">
            {Object.entries(categories).map(([categoryName, games]) => (
              <Fragment key={gameName}>
                {categoryName !== "main" && <h3>{categoryName}</h3>}
                <ul className="list-disc list-inside">
                  {games.map((game) => (
                    <li key={game.name}>
                      <a href={constructGameUrl(game.rom, platform)}>
                        {game.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </Fragment>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
