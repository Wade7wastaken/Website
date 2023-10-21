"use client";

import { useSearchParams } from "next/navigation";
import Script from "next/script";
import { useEffect, type FC } from "react";

import { Link } from "@components/ui/Link";

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

const Home: FC = () => {
  const params = useSearchParams();

  const rom = params.get("rom");
  const platform = params.get("platform") ?? "nes";

  useEffect(() => {
    window.EJS_player = "#emulator";
    window.EJS_core = platform;
    window.EJS_pathtodata = "https://demo.emulatorjs.org/data/";
    window.EJS_gameUrl = `/roms/${platform}/${rom}.7z`;
    window.EJS_thread = true;
    window.EJS_DEBUG_XX = true;
  });

  return (
    <>
      <Link href={`/games/${platform}`}>Back</Link>
      <div
        id="base"
        className="w-[960px] h-[720px] max-w-full max-h-screen min-w-[300px] min-h-[150px] m-auto resize overflow-auto"
      >
        <div id="emulator"></div>
      </div>
      <Script src="https://demo.emulatorjs.org/data/loader.js"></Script>
    </>
  );
};

export default Home;
