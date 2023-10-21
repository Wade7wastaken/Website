import type { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
  href?: string;
}

export const Link: FC<Props> = ({ children, href }) => {
  return (
    <a href={href} className={"hover:underline"}>
      {children}
    </a>
  );
};
