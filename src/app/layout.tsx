import "./styles/globals.css";

import type { Metadata } from "next";
import type { FC, ReactNode } from "react";

import { Navbar } from "@components/Navbar";

export const metadata: Metadata = {
  title: "Google",
  icons: {
    icon: "./favicon.ico",
  },
};

interface Props {
  children: ReactNode;
}

const RootLayout: FC<Props> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="m-4">{children}</div>
        <Navbar />
      </body>
    </html>
  );
};

export default RootLayout;
