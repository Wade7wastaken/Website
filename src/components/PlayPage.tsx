import { redirect } from "next/navigation";
import Script from "next/script";
import { type FC } from "react";

import { EjsSettings } from "./EjsSettings";

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
  searchParams: Record<string, string | string[] | undefined>;
};

export const PlayPage: FC<Props> = ({ searchParams }) => {
  const { rom, platform } = searchParams;

  if (typeof rom !== "string" || typeof platform !== "string") {
    alert("Incorrect search params. Redirecting to main page");
    redirect("/");
  }

  return (
    <>
      <EjsSettings
        player="#emulator"
        core={platform}
        gameUrl={`/roms/${platform}/${rom}.7z`}
      />
      <a href={`/games/${platform}`}>Back</a>
      <div
        id="base"
        className="m-auto h-[720px] max-h-screen min-h-[150px] w-[960px] min-w-[300px] max-w-full resize overflow-auto"
      >
        <div id="emulator"></div>
      </div>
      <Script
        src="https://cdn.emulatorjs.org/latest/data/loader.js"
        strategy="lazyOnload"
      ></Script>
    </>
  );
};
