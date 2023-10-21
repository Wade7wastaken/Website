import type { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import type { FC, ReactNode } from "react";

import { Button } from "./Button";

interface Props {
  children: ReactNode;
  href: Url;
}

export const NavButton: FC<Props> = ({ children, href }) => {
  return (
    <Link href={href}>
      <Button>{children}</Button>
    </Link>
  );
};
