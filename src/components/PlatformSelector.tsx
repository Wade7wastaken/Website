import type { FC } from "react";

import emuGames from "../data/emuGames.json";

import type { EmuGames } from "@data/EmuGames";

emuGames satisfies EmuGames;

export const PlatformSelector: FC = () => {
  const keys: { displayName: string; internalName: string }[] = [
    { displayName: "Web", internalName: "web" },
    ...Object.entries(emuGames).map(([key, value]) => {
      return { displayName: value.name, internalName: key };
    }),
  ];

  return (
    <div className="flex gap-2">
      {keys.map((item) => (
        <a key={item.internalName} href={`/games/${item.internalName}`}>
          {item.displayName}
        </a>
      ))}
    </div>
  );
};
