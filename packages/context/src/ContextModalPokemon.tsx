import { useMemo, useState, type ReactNode } from "react";
import { ModalsContext } from "./ContextModal";

interface ModalsContextProviderProps {
  children: ReactNode;
}

export const ModalsContextProvider = ({
  children,
}: ModalsContextProviderProps) => {
  const [showModalPokemonAdded, setShowModalPokemonAdded] = useState(false);
  const [showModalSaveTeam, setShowModalSaveTeam] = useState(false);
  const [showModalSelectedTeam, setShowModalSelectedTeam] = useState(false);
  const [showModalCombatResult, setShowModalCombatResult] = useState(false);
  const [showModalYetAdded, setShowModalYetAdded] = useState(false);

  const value = useMemo(
    () => ({
      showModalPokemonAdded,
      setShowModalPokemonAdded,
      showModalSaveTeam,
      setShowModalSaveTeam,
      showModalSelectedTeam,
      setShowModalSelectedTeam,
      showModalCombatResult,
      setShowModalCombatResult,
      showModalYetAdded,
      setShowModalYetAdded,
    }),
    [
      showModalPokemonAdded,
      showModalSaveTeam,
      showModalSelectedTeam,
      showModalCombatResult,
      showModalYetAdded,
    ],
  );

  return (
    <ModalsContext.Provider value={value}>{children}</ModalsContext.Provider>
  );
};
