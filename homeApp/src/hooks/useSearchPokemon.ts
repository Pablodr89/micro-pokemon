import { useQuery } from "@tanstack/react-query";
import { searchPokemon } from "../services/pokeApi";
import { mapApiPokemon } from "@mf/shared";
import { useEffect, useState } from "react";
import { useSearch } from "../context/Contexts";

export const useSearchPokemon = () => {
  const { namePokemon, setNamePokemon } = useSearch();
  const [debouncedName, setDebouncedName] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedName(namePokemon);
    }, 1000);

    return () => clearTimeout(timer);
  }, [namePokemon]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["pokemon", debouncedName],
    queryFn: async () => {
      const apiData = await searchPokemon(debouncedName.toLowerCase());
      return mapApiPokemon(apiData);
    },
    enabled: !!namePokemon && namePokemon.trim().length > 0,
  });

  return {
    pokemonSearch: data,
    isSearchLoading: isLoading,
    searchError: isError,
    namePokemon,
    setNamePokemon,
  };
};
