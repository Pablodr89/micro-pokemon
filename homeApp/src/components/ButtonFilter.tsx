export interface ButtonFilterProps {
  title: string;
  onClickHandler: () => void;
  type: string;
  typePokemon: string;
}

export default function ButtonFilter({
  title,
  onClickHandler,
  type,
  typePokemon,
}: ButtonFilterProps) {
  return (
    <button
      onClick={onClickHandler}
      className={`px-6 py-2 rounded-full cursor-pointer font-inter text-xs font-bold uppercase tracking-widest transition-all ${
        typePokemon === type
          ? "bg-primary text-surface"
          : "bg-surface-container hover:bg-surface-variant text-on-surface-variant"
      }`}
    >
      {title}
    </button>
  );
}
