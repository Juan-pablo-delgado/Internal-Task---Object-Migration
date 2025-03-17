import { createPokemon } from "./services/Pokemon/createPokemon";
import { getAllPokemons } from "./services/Pokemon/getAllPokemons";
import { getPokemon } from "./services/Pokemon/getPokemon";
import { enviromentVariables } from "./config/envVariables";
const { POKE_API } = enviromentVariables

const loadAll = async (): Promise<void> => {
  const pokemons: Pokemons[] = await getAllPokemons(POKE_API, 1);
  pokemons.forEach(async (e) => {
    const pokemon = await getPokemon(e);
    createPokemon(pokemon);
  });
};

loadAll();
