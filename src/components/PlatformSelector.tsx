import type { FC } from "react";

import emuGames from "../data/emuGames.json";

import { NavButton } from "./ui/NavButton";

import type { EmuGames } from "@/data/EmuGames";

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
        <NavButton key={item.internalName} href={`/games/${item.internalName}`}>
          {item.displayName}
        </NavButton>
      ))}
    </div>
  );
};
