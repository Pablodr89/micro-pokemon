import { create, type StoreApi, type UseBoundStore } from "zustand";
import { persist } from "zustand/middleware";

type PokemonStore = UseBoundStore<StoreApi<PokemonState>> & {
  persist: {
    rehydrate: () => Promise<void> | void;
  };
};

// 1. Tipado estricto para el Pokémon y sus propiedades secundarias (como tipos o estadísticas)
export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface Pokemon {
  id: number;
  name: string;
  type: string[];
  attack: number;
  defense: number;
  speed: number;
  image: string;
}

// 2. Definimos la estructura de un Equipo
export interface Team {
  id: number;
  pokemons: Pokemon[];
  isDraft: boolean;
}

// 3. Tipado completo y limpio del Store
interface PokemonState {
  teams: Team[];
  tempOrders: Record<number, Pokemon[]>;
  draft: Team | null;

  // Acciones
  addPokemonToTeam: (pokemon: Pokemon) => boolean;
  discardDraft: () => void;
  removeTeam: (teamId: number) => void;
  sortTeamByAttack: (teamId: number) => Pokemon[];
  shuffleTeam: (teamId: number) => Pokemon[];
  setManualOrder: (teamId: number, newOrder: Pokemon[]) => void;
  saveTeamOrder: (teamId: number) => void;
  removePokemonFromDraft: (pokemonId: number) => void;
}

// Función auxiliar tipada para calcular el siguiente ID de equipo
const getNextId = (teams: Team[], draft: Team | null): number => {
  const teamIds = teams.map((t) => t.id);
  const draftId = draft ? [draft.id] : [];
  const allIds = [...teamIds, ...draftId];

  return allIds.length === 0 ? 1 : Math.max(...allIds) + 1;
};

const createPokemonStore = (): PokemonStore =>
  create<PokemonState>()(
    persist(
      (set, get) => ({
        teams: [],
        tempOrders: {},
        draft: null,

        addPokemonToTeam: (pokemon) => {
          const { teams, draft } = get();
          const currentTeams = Array.isArray(teams) ? teams : [];

          // Si ya está en el borrador, no se añade
          if (draft?.pokemons.some((p) => p.id === pokemon.id)) {
            return false;
          }

          // Si no hay borrador, se crea uno nuevo
          const currentDraft: Team = draft ?? {
            id: getNextId(currentTeams, null),
            pokemons: [],
            isDraft: true,
          };

          const updatedPokemons = [...currentDraft.pokemons, pokemon];

          // Equipo completo: pasa a guardados y se limpia el borrador
          if (updatedPokemons.length === 6) {
            const finalTeam: Team = {
              ...currentDraft,
              pokemons: updatedPokemons,
              isDraft: false,
            };

            set({
              teams: [...currentTeams, finalTeam],
              draft: null,
            });

            alert("El equipo se ha completado.");
            return true;
          }

          // Equipo incompleto: se actualiza el borrador
          set({
            teams: currentTeams,
            draft: { ...currentDraft, pokemons: updatedPokemons },
          });

          return true;
        },

        discardDraft: () => set({ draft: null }),

        removeTeam: (teamId) =>
          set((state) => ({
            teams: state.teams.filter((t) => t.id !== teamId),
          })),

        sortTeamByAttack: (teamId) => {
          let sorted: Pokemon[] = [];
          set((state) => {
            const team = state.teams.find((t) => t.id === teamId);
            if (!team) return state;

            sorted = [...team.pokemons].sort((a, b) => b.attack - a.attack);

            return {
              tempOrders: { ...state.tempOrders, [teamId]: sorted },
            };
          });
          return sorted;
        },

        shuffleTeam: (teamId) => {
          let shuffled: Pokemon[] = [];
          set((state) => {
            const team = state.teams.find((t) => t.id === teamId);
            if (!team) return state;

            shuffled = [...team.pokemons].sort(() => Math.random() - 0.5);

            return {
              tempOrders: { ...state.tempOrders, [teamId]: shuffled },
            };
          });
          return shuffled;
        },

        setManualOrder: (teamId, newOrder) =>
          set((state) => ({
            tempOrders: {
              ...state.tempOrders,
              [teamId]: newOrder,
            },
          })),

        saveTeamOrder: (teamId) =>
          set((state) => {
            const newOrder = state.tempOrders[teamId];
            if (!newOrder) return state;

            const updatedTeams = state.teams.map((t) =>
              t.id === teamId ? { ...t, pokemons: newOrder } : t,
            );

            const nextTempOrders = { ...state.tempOrders };
            delete nextTempOrders[teamId];

            return {
              teams: updatedTeams,
              tempOrders: nextTempOrders,
            };
          }),

        removePokemonFromDraft: (pokemonId) =>
          set((state) => {
            if (!state.draft) return state;

            const updatedPokemons = state.draft.pokemons.filter(
              (p) => p.id !== pokemonId,
            );

            if (updatedPokemons.length === 0) {
              return { draft: null };
            }

            return {
              draft: {
                ...state.draft,
                pokemons: updatedPokemons,
              },
            };
          }),
      }),
      {
        name: "pokemon-storage",
        partialize: (state) => ({ teams: state.teams, draft: state.draft }),
      },
    ),
  );

// Instancia única compartida entre todas las copias del módulo
const g = globalThis as unknown as {
  __mfPokemonStore?: ReturnType<typeof createPokemonStore>;
};

export const usePokemonStore = (g.__mfPokemonStore ??= createPokemonStore());
