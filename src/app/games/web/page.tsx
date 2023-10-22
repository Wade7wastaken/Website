import type { FC } from "react";

import { PlatformSelector } from "@components/PlatformSelector";
import { Web } from "@components/Web";

const WebPage: FC = () => {
  return (
    <>
      <PlatformSelector activePage="web" />
      <Web />
    </>
  );
};

export default WebPage;
