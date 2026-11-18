import TeamCard from "./components/TeamCard";
import DraftCard from "./components/DraftCard";
import { usePokemonStore } from "@mf/stores";
import { Button } from "@mf/ui";
import { useCombatStore } from "@mf/stores";

interface TeamsProps {
  onStartCombat?: () => void;
}

export default function Teams({ onStartCombat }: TeamsProps) {
  const { teams, draft } = usePokemonStore();
  const { teamA, teamB } = useCombatStore();
  const teamsArray = Object.values(teams);

  return (
    <div className="animate-in flex flex-col items-start w-full gap-8 py-20">
      <div className="flex justify-end w-full">
        <Button
          typeButton="PRIMARY"
          text="Empezar combate"
          onClickHandler={() => onStartCombat && onStartCombat()}
          disabled={!teamA || !teamB}
        />
      </div>

      {/* Draft */}
      {draft && (
        <div className="flex flex-col gap-3">
          <h2 className="font-headline text-3xl font-bold tracking-tight">
            Borrador Actual
          </h2>
          <DraftCard team={draft} isDraft />
        </div>
      )}

      {/* Equipos cerrados */}
      <div className="flex flex-col gap-3">
        <h2 className="font-headline text-3xl font-bold tracking-tight">
          Equipos Guardados
        </h2>

        {teamsArray.length === 0 && <p>No hay equipos aún</p>}

        <div className="flex flex-col gap-4">
          {teamsArray.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      </div>
    </div>
  );
}
