import type { FC, ReactNode } from "react";

import { PlatformSelector } from "@components/PlatformSelector";

type Props = {
  children: ReactNode;
};

const GamesLayout: FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col gap-3 mt-4 ml-4">
      <h1 className="font-bold text-xl">Choose a platform</h1>
      <PlatformSelector />
      {children}
    </div>
  );
};

export default GamesLayout;
