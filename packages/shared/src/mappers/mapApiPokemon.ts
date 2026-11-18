import type { PokemonDetailsResponse } from "../interface/pokemonInterface";

export interface Pokemon {
  id: number;
  name: string;
  type: string[];
  attack: number;
  defense: number;
  speed: number;
  image: string;
}

export function mapApiPokemon(apiData: PokemonDetailsResponse): Pokemon {
  return {
    id: apiData.id,
    name: apiData.name,
    type: apiData.types.map((t) => t.type.name),
    attack: apiData.stats.find((s) => s.stat.name === "attack")?.base_stat ?? 0,
    defense:
      apiData.stats.find((s) => s.stat.name === "defense")?.base_stat ?? 0,
    speed: apiData.stats.find((s) => s.stat.name === "speed")?.base_stat ?? 0,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${apiData.id}.png`,
  };
}
