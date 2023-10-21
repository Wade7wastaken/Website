import type { FC } from "react";

import { EmuGamesList } from "@components/EmuGamesList";

const NdsPage: FC = () => {
  return <EmuGamesList platform="nds" />;
};

export default NdsPage;
