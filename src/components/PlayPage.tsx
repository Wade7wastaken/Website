"use client";

import { redirect, useSearchParams } from "next/navigation";
import Script from "next/script";
import { type FC } from "react";

import { EjsSettings } from "./EjsSettings";
import { RefreshLink } from "./EmuGamesList";

export const PlayPage: FC = () => {
  const params = useSearchParams();

  const rom = params.get("rom");
  const platform = params.get("platform");

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
      <RefreshLink href={`/games/${platform}`}>Back</RefreshLink>
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
