"use client";

import { useEffect, type FC } from "react";

declare global {
  // We have to disable this here because eslint isn't smart enough to see that
  // we can't use a type here

  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Window {
    EJS_player: string;
    EJS_gameUrl: string;
    EJS_pathtodata: string;
    EJS_language: string;
    EJS_paths: Record<string, string>;
    EJS_volume: number;
    EJS_gameName: string;
    EJS_cheats: [string, string][];
    EJS_fullscreenOnLoad: boolean;
    EJS_startOnLoad: boolean;
    EJS_core: string;
    EJS_biosUrl: string;
    EJS_gamePatchUrl: string;
    EJS_thread: boolean;
    EJS_gameParentUrl: string;
    EJS_loadStateURL: string;
    EJS_color: string;
    EJS_alignStartButton: string;
    EJS_backgroundImage: string;
    EJS_backgroundBlur: boolean;
    EJS_backgroundColor: string;
    EJS_AdUrl: string;
    EJS_AdTimer: number;
    EJS_AdMode: number;
    EJS_AdSize: [string, string];
    EJS_DEBUG_XX: boolean;
  }
}

type Props = {
  player: string;
  core: string;
  dataPath?: string;
  gameUrl: string;
  threading?: boolean;
};

export const EjsSettings: FC<Props> = ({
  player,
  core,
  dataPath = "https://cdn.emulatorjs.org/latest/data/",
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
  // eslint-disable-next-line unicorn/no-null
  return null;
};
