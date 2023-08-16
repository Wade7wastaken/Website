import type { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  styles?: string;
  onClick?: () => void;
};

export const Button: FC<Props> = ({ children, styles = "", onClick }) => {
  return (
    <button
      className={
        styles +
        "bg-sky-500 hover:bg-sky-600 py-1.5 px-3 rounded-lg"
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
};
