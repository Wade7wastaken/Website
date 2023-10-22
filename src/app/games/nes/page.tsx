import type { FC } from "react";

import { EmuGamesList } from "@components/EmuGamesList";
import { PlatformSelector } from "@components/PlatformSelector";

const NesPage: FC = () => {
  return (
    <>
      <PlatformSelector activePage="nes"/>
      <EmuGamesList platform="nes" />
    </>
  );
};

export default NesPage;
