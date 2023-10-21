import "./styles/globals.css";

import type { Metadata } from "next";
import type { FC, ReactNode } from "react";

import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Nothing to see here",
  description: "Nothing to see here either",
  icons: {
    icon: "./favicon.ico",
  },
};

type Props = {
  children: ReactNode;
};

const RootLayout: FC<Props> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        {children}
        <div className="mb-20"></div>
        <Navbar />
      </body>
    </html>
  );
};

export default RootLayout;
