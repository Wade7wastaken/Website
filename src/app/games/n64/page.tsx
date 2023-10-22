import type { FC } from "react";

import { EmuGamesList } from "@components/EmuGamesList";
import { PlatformSelector } from "@components/PlatformSelector";

const N64Page: FC = () => {
  return (
    <>
      <PlatformSelector activePage="n64" />
      <EmuGamesList platform="n64" />
    </>
  );
};

export default N64Page;
