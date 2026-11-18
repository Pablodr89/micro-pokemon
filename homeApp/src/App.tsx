import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FilterPokemonContextProvider } from "./context/ContextFilterPokemon.tsx";
import { SearchPokemonContextProvider } from "./context/ContextSearchPokemon.tsx";
import HomeApp from "./HomeApp.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <FilterPokemonContextProvider>
        <SearchPokemonContextProvider>
          <HomeApp />
        </SearchPokemonContextProvider>
      </FilterPokemonContextProvider>
    </QueryClientProvider>
  );
}
