interface Ubication {
  areas: Region[];
  game_indices: GameIndex[];
  id: number;
  name: string;
  names: Name[];
  region: Region;
}

interface Region {
  name: string;
  url: string;
}

interface GameIndex {
  game_index: number;
  generation: Region;
}

interface Name {
  language: Region;
  name: string;
}
