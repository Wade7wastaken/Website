import type { FC } from "react";

import { EmuGamesList } from "@/components/EmuGamesList";

const NesPage: FC = () => {
  return <EmuGamesList platform="nes" />;
};

export default NesPage;
