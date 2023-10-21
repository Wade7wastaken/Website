import type { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import type { FC, ReactNode } from "react";

import { Button } from "./Button";

type Props = {
  children: ReactNode;
  styles?: string;
  href: Url;
};

export const NavButton: FC<Props> = ({ children, styles = "", href }) => {
  return (
    <Button styles={styles}>
      <Link href={href}>{children}</Link>
    </Button>
  );
};
