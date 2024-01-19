import type { FC } from "react";

import { EmuGamesList } from "./EmuGamesList";
import { PlatformSelector } from "./PlatformSelector";

import type { EmuPlatformName } from "@data/emuGames";

interface Props {
  page: EmuPlatformName;
}

export const EmuPage: FC<Props> = ({ page }) => {
  return (
    <>
      <PlatformSelector activePage={page} />
      <EmuGamesList platform={page} />
    </>
  );
};
