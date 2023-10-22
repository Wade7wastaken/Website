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
      className={`transition text-sm py-1.5 px-3 rounded-lg ${
        small ? "h-8" : "h-10"
      } ${active ? "bg-sky-700" : "bg-sky-500 hover:bg-sky-600"}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
