import { RefreshLink } from "./RefreshLink";

import type { EmuPlatformName, EmuGame } from "@data/emuGames";
import type { FC } from "react";

const constructGameUrl = (romLocation: string, platform: string): string =>
  `/play?rom=${romLocation}&platform=${platform}`;

export const GameList: FC<{
  platform: EmuPlatformName;
  games: EmuGame[];
}> = ({ platform, games }) => {
  return (
    <ul className="list-inside list-disc">
      {games.map(({ title, internalName }) => (
        <li key={internalName}>
          <RefreshLink href={constructGameUrl(internalName, platform)}>
            {title}
          </RefreshLink>
        </li>
      ))}
    </ul>
  );
};
