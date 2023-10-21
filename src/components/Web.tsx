"use client";

import type { ChangeEvent } from "react";
import { useState, type FC } from "react";

import { LinkList } from "./LinkList";

export const Web: FC = () => {
  const [search, setSearch] = useState("");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value.toLowerCase());
  };

  return (
    <>
      <input
        type="text"
        className="w-40 bg-slate-500"
        onChange={handleSearch}
      />
      <LinkList search={search} />
    </>
  );
};
