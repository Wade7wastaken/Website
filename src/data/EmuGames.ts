export type Platforms = "nes" | "gba" | "n64" | "nds";

export type EmuGames = {
  [key in Platforms]: Platform;
};

export interface Platform {
  name: string;
  games: CollectionList;
}

type CollectionList = Record<string, GameCategory>;

type GameCategory = Record<string, GameList[]>;

interface GameList {
  name: string;
  rom: string;
}
