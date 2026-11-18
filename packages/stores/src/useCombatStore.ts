import { create, type StoreApi, type UseBoundStore } from "zustand";
import type { Team, Pokemon } from "./usePokemonStore";

type CombatStore = UseBoundStore<StoreApi<CombatState>>;

// 1. Tipados específicos para el combate
export interface CombatHistoryItem {
  match: [string, string];
  winner: string;
}

export interface TeamStats {
  alive: number;
  defeated: number;
}

export interface GameResult {
  winner: number; // ID del equipo ganador
  statsA: TeamStats;
  statsB: TeamStats;
}

// 2. Tipado completo del Store de Combate
interface CombatState {
  teamA: Team | null;
  teamB: Team | null;
  history: CombatHistoryItem[];
  gameResult: GameResult | null;
  defeatedIds: number[];

  // Acciones
  selectTeam: (team: Team) => void;
  combatEnded: () => void;
  discardTeam: (team: Team) => void;
  runTournament: () => Promise<void>;
}

const createCombatStore = (): CombatStore =>
  create<CombatState>()((set, get) => ({
    teamA: null,
    teamB: null,
    history: [],
    gameResult: null,
    defeatedIds: [],

    selectTeam: (team) => {
      const { teamA, teamB } = get();

      if (!teamA) {
        set({ teamA: team });
      } else if (!teamB) {
        if (team.id === teamA.id) {
          alert("Ya has elegido este equipo como Equipo A. Elige otro.");
          return;
        }
        set({ teamB: team });
      } else {
        alert(
          "Ya has elegido los dos equipos. ¡Haz clic en Combatir o reinicia la selección!",
        );
      }
    },

    combatEnded: () => {
      set(() => ({
        teamA: null,
        teamB: null,
        history: [],
        gameResult: null,
        defeatedIds: [],
      }));
    },

    discardTeam: (team) => {
      const { teamA } = get();
      if (teamA && teamA.id === team.id) {
        set(() => ({
          teamA: null,
        }));
      } else {
        set(() => ({
          teamB: null,
        }));
      }
    },

    runTournament: async () => {
      const { teamA, teamB } = get();
      if (!teamA || !teamB) return;

      // Resetear estados al empezar
      set({ history: [], gameResult: null, defeatedIds: [] });

      let i = 0;
      let j = 0;
      const team1: Pokemon[] = [...teamA.pokemons];
      const team2: Pokemon[] = [...teamB.pokemons];

      while (i < team1.length && j < team2.length) {
        const p1 = team1[i];
        const p2 = team2[j];

        // Espera de 3 segundos
        await new Promise<void>((resolve) => setTimeout(resolve, 3000));

        const fast = p1.speed >= p2.speed ? p1 : p2;
        const slow = p1.speed >= p2.speed ? p2 : p1;

        let winner: Pokemon;
        if (fast.attack > slow.defense) winner = fast;
        else if (slow.attack > fast.defense) winner = slow;
        else winner = fast;

        const loser = winner === p1 ? p2 : p1;

        set((state) => ({
          defeatedIds: [...state.defeatedIds, loser.id],
          history: [
            ...state.history,
            { match: [p1.name, p2.name], winner: winner.name },
          ],
        }));

        if (winner === p1) {
          j++;
        } else {
          i++;
        }
      }

      set({
        gameResult: {
          winner: i < team1.length ? teamA.id : teamB.id,
          statsA: { alive: team1.length - i, defeated: i },
          statsB: { alive: team2.length - j, defeated: j },
        },
      });
    },
  }));

const g = globalThis as unknown as {
  __mfCombatStore?: CombatStore;
};

export const useCombatStore: CombatStore = (g.__mfCombatStore ??=
  createCombatStore());
