import Link from "next/link";
import type { FC } from "react";

import { Button } from "./ui/Button";

import type { EmuGames, Platforms } from "@data/EmuGames";
import emuGames from "@data/emuGames.json";

emuGames satisfies EmuGames;

interface Props {
  activePage: Platforms | "web";
}

export const PlatformSelector: FC<Props> = ({ activePage }) => {
  const keys: { displayName: string; internalName: string }[] = [
    { displayName: "Web", internalName: "web" },
    ...Object.entries(emuGames).map(([key, value]) => {
      return { displayName: value.name, internalName: key };
    }),
  ];

  return (
    <>
      <h1 className="font-bold text-xl mb-2">Choose a platform</h1>
      <div className="flex whitespace-nowrap overflow-x-auto gap-2 pb-2">
        {keys.map((item) => (
          <Link key={item.internalName} href={`/games/${item.internalName}`}>
            <Button active={item.internalName === activePage}>
              {item.displayName}
            </Button>
          </Link>
        ))}
      </div>
    </>
  );
};
