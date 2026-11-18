import images from "@mf/assets";
import { useSearchPokemon } from "../hooks/useSearchPokemon";
import { useFilterTypePokemon } from "../hooks/useTypePokemon";

export default function SearchBar({ customClasses = "" }) {
  const { namePokemon, setNamePokemon } = useSearchPokemon();
  const { setTypePokemon } = useFilterTypePokemon();

  return (
    <div className={`w-full ${customClasses}`}>
      <div className="relative">
        <img
          src={images.search}
          alt="search"
          className="absolute left-3 top-1/2 -translate-y-1/2 h-6 w-auto"
        />

        <input
          type="text"
          inputMode="text"
          placeholder="Buscar Pokémon..."
          className={` bg-white/10 border-none w-full ring-2 ring-indigo-400 lg:outline-none rounded-lg pl-10 pr-4 py-2 text-sm text-indigo-400 placeholder:text-indigo-300/50 transition-all`}
          value={namePokemon}
          onChange={(e) => {
            setNamePokemon(e.target.value);
            setTypePokemon("");
          }}
        />
      </div>
    </div>
  );
}
