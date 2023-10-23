import scrapeLinks from "@data/scrapeLinks";

type Locations = typeof scrapeLinks.locations;

export interface Game {
  name: string;
  url: string;
  location: (typeof scrapeLinks.locations)[number];
}

export interface ScrapeLinks {
  games: readonly Game[];
  locations: Locations;
}

scrapeLinks satisfies ScrapeLinks;
