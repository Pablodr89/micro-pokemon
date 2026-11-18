import ButtonFilter from "./ButtonFilter";
import { useGetTypesPokemon } from "../hooks/useTypePokemon";

interface FiltersProps {
  setNamePokemon: (name: string) => void;
  typePokemon: string;
  setTypePokemon: (type: string) => void;
}

export default function Filters({
  setNamePokemon,
  typePokemon,
  setTypePokemon,
}: FiltersProps) {
  const types = useGetTypesPokemon();

  return (
    <div className="flex flex-wrap items-center gap-4 w-full px-2.5">
      <ButtonFilter
        title="All"
        type=""
        onClickHandler={() => {
          setTypePokemon("");
          setNamePokemon("");
        }}
        typePokemon={typePokemon}
      />

      {types.map((type, i) => (
        <ButtonFilter
          key={i}
          title={type}
          type={type}
          onClickHandler={() => {
            setTypePokemon(type);
            setNamePokemon("");
          }}
          typePokemon={typePokemon}
        />
      ))}
    </div>
  );
}
