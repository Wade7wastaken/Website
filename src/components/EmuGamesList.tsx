import Link from "next/link";
import { Fragment, type FC } from "react";

import emuGames from "../data/emuGames.json";

import type { EmuGames, Platforms } from "@/data/EmuGames";

emuGames satisfies EmuGames;

type Props = {
  platform: Platforms;
};

export const EmuGamesList: FC<Props> = ({ platform }) => {
  const data = emuGames[platform];

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-semibold">{data.name}</h1>
      {Object.entries(data.games).map(([gameName, categories]) => (
        <div key={gameName}>
          <h2 className="text-xl mb-6">
            {gameName}
          </h2>
          <div className="ml-4 flex flex-col gap-3">
            {Object.entries(categories).map(([categoryName, games]) => (
              <Fragment key={gameName}>
                {categoryName !== "main" && (
                  <h3>{categoryName}</h3>
                )}
                <ul className="list-disc list-inside">
                  {games.map((game) => (
                    <li key={game.name}>
                      <Link
                        href={{
                          pathname: "/play",
                          query: { rom: game.rom, platform },
                        }}
                      >
                        {game.name}
                      </Link>
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
