import Script from "next/script";
import type { FC } from "react";

interface Props {
  platform: string;
}

export const EjsContent: FC<Props> = ({ platform }) => {
  return (
    <>
      <a href={`/games/${platform}`}>Back</a>
      <div
        id="base"
        className="m-auto h-[720px] max-h-screen min-h-[150px] w-[960px] min-w-[300px] max-w-full resize overflow-auto"
      >
        <div id="emulator"></div>
      </div>
      <Script
        src="https://demo.emulatorjs.org/data/loader.js"
        strategy="lazyOnload"
      ></Script>
    </>
  );
};
