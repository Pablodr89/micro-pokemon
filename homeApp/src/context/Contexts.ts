import { createContext, useContext } from "react";

export interface FiltersContextType {
  typePokemon: string;
  setTypePokemon: (type: string) => void;
}
export interface SearchContextType {
  namePokemon: string;
  setNamePokemon: (name: string) => void;
}

export const SearchContext = createContext<SearchContextType | null>(null);
export const FiltersContext = createContext<FiltersContextType | null>(null);

function useRequiredContext<T>(
  context: React.Context<T | null>,
  name: string,
): T {
  const value = useContext(context);
  if (!value) {
    throw new Error(`${name} debe usarse dentro de su Provider`);
  }
  return value;
}

export const useSearch = () => useRequiredContext(SearchContext, "useSearch");
export const useFilters = () =>
  useRequiredContext(FiltersContext, "useFilters");
