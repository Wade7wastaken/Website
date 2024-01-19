export interface EmuGame {
  title: string;
  internalName: string;
}

export interface EmuGroup {
  name: string;
  main: readonly EmuGame[];
  romhacks: readonly EmuGame[];
}

export interface EmuPlatform {
  displayName: string;
  abbreviation: string;
  groups: readonly EmuGroup[];
}

type EmuGames = Record<string, EmuPlatform>;

const data = {
  nes: {
    displayName: "Nintendo Entertainment System",
    abbreviation: "NES",
    groups: [
      {
        name: "Super Mario Bros.",
        main: [
          {
            title: "Super Mario Bros.",
            internalName: "super-mario-bros",
          },
          {
            title: "Super Mario Bros. 2",
            internalName: "super-mario-bros-2",
          },
          {
            title: "Super Mario Bros. 3",
            internalName: "super-mario-bros-3",
          },
        ],
        romhacks: [
          {
            title: "Super Mario Bros. Practice",
            internalName: "super-mario-bros-practice",
          },
        ],
      },
      {
        name: "Tetris",
        main: [
          {
            title: "Tetris (USA)",
            internalName: "tetris",
          },
        ],
        romhacks: [],
      },
    ],
  },

  gba: {
    displayName: "Gameboy Advance",
    abbreviation: "GBA",
    groups: [
      {
        name: "Pokémon",
        main: [
          {
            title: "Pokémon Emerald",
            internalName: "pokemon-emerald",
          },
          {
            title: "Pokémon FireRed",
            internalName: "pokemon-fire-red",
          },
          {
            title: "Pokémon Ruby",
            internalName: "pokemon-ruby",
          },
          {
            title: "Pokémon Sapphire",
            internalName: "pokemon-sapphire",
          },
        ],
        romhacks: [
          {
            title: "Pokémon Emerald (1/50 Shiny Odds)",
            internalName: "pokemon-emerald-shiny",
          },
          {
            title: "Pokémon Radical Red",
            internalName: "pokemon-radical-red",
          },
        ],
      },
    ],
  },

  n64: {
    displayName: "Nintendo 64",
    abbreviation: "N64",
    groups: [
      {
        name: "Super Mario 64",
        main: [
          {
            title: "Super Mario 64 (USA)",
            internalName: "super-mario-64-us",
          },
          {
            title: "Supar Mario 64 (JP)",
            internalName: "super-mario-64-jp",
          },
        ],
        romhacks: [
          {
            title: "Super Mario 64 Randomizer",
            internalName: "super-mario-64-random",
          },
          {
            title: "Super Mario 64 Randomizer Nonstop",
            internalName: "super-mario-64-random-nonstop",
          },
          {
            title: "Super Mario 64 The ABC Trials",
            internalName: "super-mario-64-abc-trials",
          },
          {
            title: "Gravity Swap 64",
            internalName: "super-mario-64-gravity-swap",
          },
        ],
      },
      {
        name: "The Legend of Zelda",
        main: [
          {
            title: "Ocarina of Time",
            internalName: "ocarina-of-time",
          },
          {
            title: "Ocarina of Time (Rev 1)",
            internalName: "ocarina-of-time-rev1",
          },
          {
            title: "Ocarina of Time (Rev 2)",
            internalName: "ocarina-of-time-rev2",
          },
        ],
        romhacks: [],
      },
      {
        name: "Super Smash Bros.",
        main: [
          {
            title: "Super Smash Bros. 64",
            internalName: "super-smash-bros-64",
          },
        ],
        romhacks: [
          {
            title: "Super Smash Bros. Remix",
            internalName: "super-smash-bros-remix",
          },
        ],
      },
      {
        name: "Donkey Kong 64",
        main: [
          {
            title: "Donkey Kong 64",
            internalName: "donkey-kong-64",
          },
        ],
        romhacks: [],
      },
    ],
  },
  nds: {
    displayName: "Nintendo DS",
    abbreviation: "NDS",
    groups: [
      {
        name: "Pokémon",
        main: [
          {
            title: "Pokemon Platinum (1.1)",
            internalName: "pokemon-platinum",
          },
          {
            title: "Pokemon Diamond (1.5)",
            internalName: "pokemon-diamond",
          },
          {
            title: "Pokemon Pearl (1.5)",
            internalName: "pokemon-pearl",
          },
          {
            title: "Pokemon Heart Gold (1.0)",
            internalName: "pokemon-heartgold",
          },
          {
            title: "Pokemon Soul Silver (1.0)",
            internalName: "pokemon-soulsilver",
          },
          {
            title: "Pokemon Black (1.0)",
            internalName: "pokemon-black",
          },
          {
            title: "Pokemon White (1.0)",
            internalName: "pokemon-white",
          },
          {
            title: "Pokemon Black 2 (1.0)",
            internalName: "pokemon-black-2",
          },
          {
            title: "Pokemon White 2 (1.0)",
            internalName: "pokemon-white-2",
          },
        ],
        romhacks: [],
      },
      {
        name: "Mario Kart",
        main: [
          {
            title: "Mario Kart DS",
            internalName: "mario-kart-ds",
          },
        ],
        romhacks: [],
      },
      {
        name: "Phoenix Wright",
        main: [
          {
            title: "Phoenix Wright: Ace Attorney",
            internalName: "phoenix-wright-ace-attorney",
          },
          {
            title: "Phoenix Wright: Ace Attorney - Justice for All",
            internalName: "phoenix-wright-ace-attorney-justice-for-all",
          },
          {
            title: "Phoenix Wright: Ace Attorney - Trials and Tribulations",
            internalName:
              "phoenix-wright-ace-attorney-justice-for-all-trials-and-tribulations",
          },
        ],
        romhacks: [],
      },
      {
        name: "Grand Theft Auto",
        main: [
          {
            title: "Grand Theft Auto - Chinatown Wars (1.0)",
            internalName: "grand-theft-auto-chinatown-wars",
          },
        ],
        romhacks: [],
      },
    ],
  },
} satisfies EmuGames;

export type EmuPlatformName = keyof typeof data;

export default data;
