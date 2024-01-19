import type { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
  small?: boolean;
  active?: boolean;
  onClick?: () => void;
}

export const Button: FC<Props> = ({
  children,
  onClick,
  small = false,
  active = false,
}) => {
  return (
    <button
      className={`rounded-lg px-3 py-1.5 text-sm transition ${
        small ? "h-8" : "h-10"
      } ${active ? "bg-sky-700" : "bg-sky-500 hover:bg-sky-600"}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
