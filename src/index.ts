import { getAllPokemons } from "./services/Pokemon/getAllPokemons";
import { getPokemon } from "./services/Pokemon/getPokemon";
import { enviromentVariables } from "./config/envVariables";
import { getAllMoves } from "./services/Moves/getAllMoves";
import { getLocation } from "./services/Locations/getLocation";
import { getAllLocations } from "./services/Locations/getAllLocations";
import { getMove } from "./services/Moves/getMove";
import { createPokemon } from "./services/Pokemon/createPokemon";
const { POKE_API } = enviromentVariables;

const loadAll = async (): Promise<void> => {
  const pokemons: Pokemons[] = await getAllPokemons(POKE_API, 1);
  const moves: Moves[] = await getAllMoves(POKE_API, 1);
  const locations: Locations[] = await getAllLocations(POKE_API, 1);
  pokemons.forEach(async (e) => {
    const pokemon = await getPokemon(e);
    createPokemon(pokemon);
  });

  // moves.forEach(async (e) => {
  //   const move = await getMove(e);
  //   console.log(move);
  // });

  // locations.forEach(async (e) => {
  //   const location = await getLocation(e);
  //   console.log(location);
  // });
};

loadAll();
