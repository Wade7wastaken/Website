"use client";

import { useState, type FC    } from "react";

import { Button } from "./ui/Button";

import type { Game } from "@data/scrapeLinksTypes";
import type { ChangeEvent } from "react";

import scrapeLinks from "@data/scrapeLinks";


const GAMES_PER_PAGE = 100;

const filterGames = (search: string, filteredSites: string[]): Game[] =>
  scrapeLinks.games.filter(
    (game) =>
      game.name.toLowerCase().includes(search.toLowerCase()) &&
      !filteredSites.includes(game.location)
  );

const collectGames = (
  search: string,
  filteredSites: string[],
  page: number
): { games: Game[]; numPages: number } => {
  const filtered = filterGames(search, filteredSites);

  const startingIndex = page * GAMES_PER_PAGE;

  return {
    games: filtered.slice(startingIndex, startingIndex + GAMES_PER_PAGE),
    numPages: Math.ceil(filtered.length / GAMES_PER_PAGE),
  };
};

const randomGame = (search: string, filteredSites: string[]): Game => {
  const filtered = filterGames(search, filteredSites);

  const random = filtered[Math.floor(Math.random() * filtered.length)];

  if (random === undefined)
    throw new Error(
      "Filtered games index out of range. You shouldn't ever see this"
    );
  return random;
};

const prevAllowed = (proposedNewValue: number): boolean =>
  proposedNewValue >= 0;

export const Web: FC = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [filteredSites, setFilteredSites] = useState<string[]>([]);

  const handleAddRemove = (item: string): void => {
    if (filteredSites.includes(item)) {
      // Remove the item if it's already in the array
      setFilteredSites(filteredSites.filter((i) => i !== item));
    } else {
      // Add the item if it's not in the array
      setFilteredSites([...filteredSites, item]);
    }
  };

  const filtered = collectGames(search, filteredSites, page);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value);
    setPage(0);
  };

  // subtract 1 because proposedNewValue is 0-based and we're comparing with the
  // number of elements
  const nextAllowed = (proposedNewValue: number): boolean =>
    proposedNewValue <= filtered.numPages - 1;

  const handleNext = (): void => {
    setPage(
      (previousPage: number) =>
        previousPage + (nextAllowed(previousPage + 1) ? 1 : 0)
    );
  };
  const handlePrev = (): void => {
    setPage(
      (previousPage: number) =>
        previousPage - (prevAllowed(previousPage - 1) ? 1 : 0)
    );
  };

  const nextPrevButtons = (
    <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap">
      <Button onClick={handlePrev} small active={!prevAllowed(page - 1)}>
        Previous page
      </Button>
      <Button onClick={handleNext} small active={!nextAllowed(page + 1)}>
        Next page
      </Button>
      <Button
        small
        onClick={(): void => {
          window.open(randomGame(search, filteredSites).url);
        }}
      >
        Random
      </Button>
      Page {page + 1} of {filtered.numPages}
    </div>
  );

  return (
    <div className="mt-4 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <input
          type="text"
          className="max-w-[48rem] rounded border-[1px] border-solid border-slate-200 bg-slate-500 placeholder:text-center"
          onChange={handleSearch}
          placeholder="Search"
        />
        <div className="flex gap-2 overflow-x-auto whitespace-nowrap pb-2">
          {scrapeLinks.locations.map((item) => (
            <Button
              key={item}
              onClick={(): void => {
                handleAddRemove(item);
              }}
              small
              active={filteredSites.includes(item)}
            >
              {item}
            </Button>
          ))}
        </div>
      </div>

      {nextPrevButtons}

      <div className="flex flex-col gap-3 text-lg">
        {filtered.games.map((item) => (
          <div key={item.location + item.name}>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mr-1"
              style={{
                color: `hsl(${
                  (360 / scrapeLinks.locations.length) *
                  scrapeLinks.locations.indexOf(item.location)
                }, 100%, 85%)`,
              }}
            >
              {item.name}
            </a>
            <span className="text-xs text-slate-500">
              ({new URL(item.url).hostname})
            </span>
          </div>
        ))}
      </div>
      {nextPrevButtons}
    </div>
  );
};
