import Link from "next/link";

import { Button } from "./ui/Button";

import type { EmuPlatformName } from "@data/emuGames";
import type { FC } from "react";

import emuGames from "@data/emuGames";

type Props = {
  activePage: EmuPlatformName | "web";
};

export const PlatformSelector: FC<Props> = ({ activePage }) => {
  return (
    <div>
      <h1 className="mb-2 text-xl font-bold">Choose a platform</h1>
      <div className="flex gap-2 overflow-x-auto whitespace-nowrap pb-2">
        {[
          { displayName: "Web", internalName: "web" },
          ...Object.entries(emuGames).map(([platformName, platformData]) => ({
            displayName: platformData.displayName,
            internalName: platformName,
          })),
        ].map((page) => (
          <Link key={page.internalName} href={`/games/${page.internalName}`}>
            <Button active={page.internalName === activePage}>
              {page.displayName}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
};
