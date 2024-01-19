import Link from "next/link";
import type { FC } from "react";

import { Button } from "./ui/Button";

import type { EmuPlatformName } from "@data/emuGames";
import emuGames from "@data/emuGames";

interface Props {
  activePage: EmuPlatformName | "web";
}

export const PlatformSelector: FC<Props> = ({ activePage }) => {
  return (
    <div>
      <h1 className="font-bold text-xl mb-2">Choose a platform</h1>
      <div className="flex whitespace-nowrap overflow-x-auto gap-2 pb-2">
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
