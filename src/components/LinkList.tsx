import type { FC } from "react";

import scrapeLinks from "../data/scrapeLinks.json";

import type { ScrapeLinks } from "@/data/ScrapeLinks";

scrapeLinks satisfies ScrapeLinks;

type Props = {
  search: string;
};

export const LinkList: FC<Props> = ({ search }) => {
  const filtered = [];

  let count = 0;

  for (const game of scrapeLinks.games) {
    const searched = game.name.includes(search);
    if (searched) {
      count++;
      if (count > 100) break;
      filtered.push(game);
    }
  }

  return filtered.map((item) => <div key={item.name}>{item.name}</div>);
};
