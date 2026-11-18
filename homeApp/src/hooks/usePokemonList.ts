import { useInfiniteQuery } from "@tanstack/react-query";
import { getPokemonList } from "../services/pokeApi";
import { mapApiPokemon } from "@mf/shared";

const LIMIT = 20;

export const useGetPokemonList = () => {
  return useInfiniteQuery({
    queryKey: ["pokemonList"],
    queryFn: async ({ pageParam = 0 }) => {
      // Forzamos el tipado de pageParam a number de forma limpia
      const currentOffset = pageParam as number;

      const apiData = await getPokemonList(LIMIT, currentOffset);

      const pokemonDetail = await Promise.all(
        apiData.results.map(async (p: { url: string }) => {
          const urlPokemon = await fetch(p.url);
          const details = await urlPokemon.json();
          return mapApiPokemon(details);
        }),
      );

      return {
        results: pokemonDetail,
        nextOffset: currentOffset + LIMIT,
        hasMore: !!apiData.next,
      };
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      // Tipamos explícitamente lastPage para que TypeScript sepa qué estructura tiene
      const typedLastPage = lastPage as {
        hasMore: boolean;
        nextOffset: number;
      };
      return typedLastPage.hasMore ? typedLastPage.nextOffset : undefined;
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30, // Cambiado de cacheTime a gcTime (para React Query v5)
  });
};
