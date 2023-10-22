"use client";

import { redirect, useSearchParams } from "next/navigation";
import { useEffect, type FC } from "react";

import { EjsContent } from "./EjsContent";

declare global {
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

export const PlayPage: FC = () => {
  const params = useSearchParams();
  const rom = params.get("rom");
  const platform = params.get("platform");

  if (rom === null || platform === null) {
    alert("Incorrect search params. Redirecting to main page");
    redirect("/");
  }

  useEffect(() => {
    window.EJS_player = "#emulator";
    window.EJS_core = platform;
    window.EJS_pathtodata = "https://demo.emulatorjs.org/data/";
    window.EJS_gameUrl = `/roms/${platform}/${rom}.7z`;
    window.EJS_thread = true;
    window.EJS_DEBUG_XX = true;
  });

  return <EjsContent platform={platform} />;
};
