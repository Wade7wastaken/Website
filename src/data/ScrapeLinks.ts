import { assert } from "node:console";

import scrapeLinks from "@data/scrapeLinks.json";

export interface Game {
  name: string;
  url: string;
  location: string;
}

export interface ScrapeLinks {
  games: Game[];
  locations: string[];
}

export const locations = [
  "Unblocked Games 66 EZ",
  "Crazy Games",
  "Poki",
  "Coolmath Games",
] as const;

scrapeLinks satisfies ScrapeLinks;

assert(JSON.stringify(scrapeLinks.locations) === JSON.stringify(locations));

console.log("hi");
