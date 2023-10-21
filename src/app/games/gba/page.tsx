import type { FC } from "react";

import { EmuGamesList } from "@components/EmuGamesList";

const GbaPage: FC = () => {
  return <EmuGamesList platform="gba" />;
};

export default GbaPage;
