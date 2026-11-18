import { SearchContext } from "./Contexts";
import { useMemo, useState, type ReactNode } from "react";

interface SearchPokemonProviderProps {
  children: ReactNode;
}

export const SearchPokemonContextProvider = ({
  children,
}: SearchPokemonProviderProps) => {
  const [namePokemon, setNamePokemon] = useState("");

  const value = useMemo(() => ({ namePokemon, setNamePokemon }), [namePokemon]);

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};
