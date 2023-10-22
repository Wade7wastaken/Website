import type { FC } from "react";

import scrapeLinks from "@data/scrapeLinks.json";

interface Props {
  search: string;
}

export const LinkList: FC<Props> = ({ search }) => {
  const filtered = [];

  let count = 0;

  for (const game of scrapeLinks.games) {
    const matchesSearch = game.name.includes(search);
    if (matchesSearch) {
      count++;
      if (count > 100) break;
      filtered.push(game);
    }
  }

  console.log(filtered.length);

  return filtered.map((item) => (
    <div key={item.location + item.name}>{item.name}</div>
  ));
};
