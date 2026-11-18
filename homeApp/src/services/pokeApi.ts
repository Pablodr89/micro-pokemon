import type { PokemonApiResponse, PokemonDetailsResponse } from "@mf/shared";

const baseUrl = "https://pokeapi.co/api/v2";

export const getPokemonList = async (
  limit: number,
  offset: number,
): Promise<PokemonApiResponse> => {
  const url = `${baseUrl}/pokemon?limit=${limit}&offset=${offset}`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(url, options);

  const data = await response.json();
  return data;
};

export const searchPokemon = async (
  name: string,
): Promise<PokemonDetailsResponse> => {
  const url = `${baseUrl}/pokemon/${name.toLowerCase()}`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(url, options);

  const data = await response.json();
  return data;
};

export const getTypesPokemon = async (): Promise<PokemonApiResponse> => {
  const url = `${baseUrl}/type`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(url, options);

  const data = await response.json();
  return data;
};

export const getFilterPokemon = async (type: string) => {
  const url = `${baseUrl}/type/${type}`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(url, options);

  const data = await response.json();
  return data;
};
