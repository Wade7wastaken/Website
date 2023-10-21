import type { FC } from "react";

import { EmuGamesList } from "@components/EmuGamesList";

const N64Page: FC = () => {
  return <EmuGamesList platform="n64" />;
};

export default N64Page;
