import type { FC } from "react";

import { EmuGamesList } from "@components/EmuGamesList";
import { PlatformSelector } from "@components/PlatformSelector";

const GbaPage: FC = () => {
  return (
    <>
      <PlatformSelector activePage="gba" />
      <EmuGamesList platform="gba" />
    </>
  );
};

export default GbaPage;
