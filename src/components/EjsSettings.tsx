"use client";

import { useEffect, type FC } from "react";

type Props = {
  player: string;
  core: string;
  dataPath?: string;
  gameUrl: string;
  threading?: boolean;
}

export const EjsSettings: FC<Props> = ({
  player,
  core,
  dataPath = "https://demo.emulatorjs.org/data/",
  gameUrl,
  threading = true,
}) => {
  useEffect(() => {
    window.EJS_player = player;
    window.EJS_core = core;
    window.EJS_pathtodata = dataPath;
    window.EJS_gameUrl = gameUrl;
    window.EJS_thread = threading;
    window.EJS_DEBUG_XX = true;
  });
  return <></>;
};
