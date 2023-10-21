export type Platforms = "nes" | "gba" | "n64" | "nds";

export type EmuGames = {
  [key in Platforms]: Platform;
};

export interface Platform {
  name: string;
  games: CollectionList;
}

interface CollectionList {
  [key: string]: GameCategory;
}

interface GameCategory {
  [key: string | "main" | "Romhacks"]: GameList[];
}

interface GameList {
  name: string;
  rom: string;
}
