import { getBackgroundColorByType } from "@mf/shared";
import { Button } from "@mf/ui";
import { usePokemonStore, type Pokemon, type Team } from "@mf/stores";

export interface CardPokemonTeamCardProps {
  isDraft?: boolean;
  pokemon: Pokemon;
  team: Team;
  index: number;
}

export default function CardPokemonTeamCard({
  isDraft,
  pokemon,
  team,
  index,
}: CardPokemonTeamCardProps) {
  const bgColor = getBackgroundColorByType(pokemon.type[0]);
  const { removePokemonFromDraft } = usePokemonStore();

  return (
    <div
      data-label={pokemon.id}
      className={`flex flex-col p-2 ${isDraft ? "lg:w-52" : ""} rounded-lg shadow-md relative ${bgColor}`}
      key={`${team.id}-${pokemon.id}-${index}`}
    >
      <div className="flex items-center justify-between gap-2">
        <h2 className="min-w-0 flex-1 wrap-break-word text-start text-white text-lg leading-tight capitalize font-semibold">
          {pokemon.name}
        </h2>

        {isDraft && (
          <Button
            typeButton="NORMAL"
            text="x"
            customClasses="shrink-0 !w-8 !h-8 !rounded-xl"
            onClickHandler={() => removePokemonFromDraft(pokemon.id)}
          />
        )}
      </div>

      <div className="flex w-32 h-32 md:w-40 md:h-40">
        <img src={pokemon.image} alt={pokemon.name} className="object-cover" />
      </div>

      {/* {isDraft && (
        <Button
          typeButton="NORMAL"
          text="x"
          customClasses="absolute top-2 right-2 bg-transparent hover:bg-transparent !px-0 !py-0"
          onClickHandler={() => removePokemonFromDraft(pokemon.id)}
        />
      )} */}
    </div>
  );
}
