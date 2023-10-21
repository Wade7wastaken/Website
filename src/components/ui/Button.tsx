import type { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClick?: () => void;
}

export const Button: FC<Props> = ({ children, onClick }) => {
  return (
    <button
      className={"bg-sky-500 hover:bg-sky-600 py-1.5 px-3 rounded-lg"}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
