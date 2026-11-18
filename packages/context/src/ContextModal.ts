import { createContext, useContext } from "react";

export interface ModalsContextType {
  showModalPokemonAdded: boolean;
  setShowModalPokemonAdded: (show: boolean) => void;
  showModalSaveTeam: boolean;
  setShowModalSaveTeam: (show: boolean) => void;
  showModalSelectedTeam: boolean;
  setShowModalSelectedTeam: (show: boolean) => void;
  showModalCombatResult: boolean;
  setShowModalCombatResult: (show: boolean) => void;
  showModalYetAdded: boolean;
  setShowModalYetAdded: (show: boolean) => void;
}

export const ModalsContext = createContext<ModalsContextType | null>(null);

export function useModals() {
  const value = useContext(ModalsContext);
  if (!value) {
    throw new Error("useModals debe usarse dentro de <ModalsContextProvider>");
  }
  return value;
}
