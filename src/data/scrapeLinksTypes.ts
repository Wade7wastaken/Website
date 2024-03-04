import scrapeLinks from "@data/scrapeLinks";

type Locations = typeof scrapeLinks.sites;

export type Game = {
  name: string;
  urls: readonly string[];
  site: (typeof scrapeLinks.sites)[number];
};

type ScrapeLinks = {
  games: readonly Game[];
  sites: Locations;
};

scrapeLinks satisfies ScrapeLinks;
