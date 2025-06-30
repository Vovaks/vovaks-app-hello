export interface IPokemon {
  name: string;
  url: string;
  height?: number;
  weight?: number;
  sprites?: { front_default: string };
  types?: { type: { name: string } }[];
}

export interface IPokemonListResponse {
  count: number;
  results: IPokemon[];
}