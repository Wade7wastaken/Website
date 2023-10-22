import type { FC } from "react";

import { EmuGamesList } from "./EmuGamesList";
import { PlatformSelector } from "./PlatformSelector";

import type { Platforms } from "@data/EmuGames";

interface Props {
  page: Platforms;
}

export const EmuPage: FC<Props> = ({ page }) => {
  return (
    <>
      <PlatformSelector activePage={page} />
      <EmuGamesList platform={page} />
    </>
  );
};
