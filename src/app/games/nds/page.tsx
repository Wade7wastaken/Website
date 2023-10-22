import type { FC } from "react";

import { EmuGamesList } from "@components/EmuGamesList";
import { PlatformSelector } from "@components/PlatformSelector";

const NdsPage: FC = () => {
  return (
    <>
      <PlatformSelector activePage="nds"/>
      <EmuGamesList platform="nds" />
    </>
  );
};

export default NdsPage;
