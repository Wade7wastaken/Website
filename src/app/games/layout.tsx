import type { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const GamesLayout: FC<Props> = ({ children }) => {
  return <div className="m-4">{children}</div>;
};

export default GamesLayout;
