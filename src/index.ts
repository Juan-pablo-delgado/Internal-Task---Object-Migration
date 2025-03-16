import { createPokemon } from "./services/Pokemon/createPokemon";
import { getAllPokemons } from "./services/getAllPokemons";
import { getPokemon } from "./services/getPokemon";

const POKE_API = process.env.POKE_API!;

const loadAll = async (): Promise<void> => {
  const pokemons: Pokemons[] = await getAllPokemons(POKE_API, 1);
  pokemons.forEach(async (e) => {
    const pokemon = await getPokemon(e);
    createPokemon(pokemon);
  });
};

loadAll();
