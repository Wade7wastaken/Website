import type { FC } from "react";

import { PlatformSelector } from "./PlatformSelector";

export const PageHeader: FC = () => {
  return (
    <div className="flex flex-col gap-3 mt-4 ml-4">
      <h1 className="font-bold text-xl">Choose a platform</h1>
      <PlatformSelector />
    </div>
  );
};
