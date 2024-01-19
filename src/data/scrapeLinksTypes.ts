import scrapeLinks from "@data/scrapeLinks";

type Locations = typeof scrapeLinks.locations;

export type Game = {
  name: string;
  url: string;
  location: (typeof scrapeLinks.locations)[number];
};

type ScrapeLinks = {
  games: readonly Game[];
  locations: Locations;
};

scrapeLinks satisfies ScrapeLinks;
