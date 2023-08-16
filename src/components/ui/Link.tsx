import type { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  href?: string;
  styles?: string;
};

export const Link: FC<Props> = ({ children, href, styles = "" }) => {
  return (
    <a href={href} className={styles + "hover:underline"}>
      {children}
    </a>
  );
};
