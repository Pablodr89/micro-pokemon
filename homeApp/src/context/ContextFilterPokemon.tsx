import { FiltersContext } from "./Contexts";
import { useMemo, useState, type ReactNode } from "react";

interface FilterPokemonProviderProps {
  children: ReactNode;
}

export const FilterPokemonContextProvider = ({
  children,
}: FilterPokemonProviderProps) => {
  const [typePokemon, setTypePokemon] = useState("");

  const value = useMemo(() => ({ typePokemon, setTypePokemon }), [typePokemon]);

  return (
    <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
  );
};
