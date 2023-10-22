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
        className="w-[960px] h-[720px] max-w-full max-h-screen min-w-[300px] min-h-[150px] m-auto resize overflow-auto"
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
