import { getAllPokemons } from "./services/Pokemon/getAllPokemons";
import { getPokemon } from "./services/Pokemon/getPokemon";
import { enviromentVariables } from "./config/envVariables";
import { getAllMoves } from "./services/Moves/getAllMoves";
import { getLocation } from "./services/Locations/getLocation";
import { getAllLocations } from "./services/Locations/getAllLocations";
import { getMove } from "./services/Moves/getMove";
import { createPokemon } from "./services/Pokemon/createPokemon";
import { createLocation } from "./services/Locations/createLocation";
import { createMove } from "./services/Moves/createMove";

const { POKE_API } = enviromentVariables;

const loadAll = async (): Promise<void> => {
  const pokemons: Pokemons[] = await getAllPokemons(POKE_API, 100);
  const moves: Moves[] = await getAllMoves(POKE_API, 1);
  const locations: Locations[] = await getAllLocations(POKE_API, 1);

  // Create Moves
  // await Promise.all(
  //   moves.map(async (e) => {
  //     const move = await getMove(e);
  //     await createMove(move);
  //   })
  // );

  // // Create locations
  // await Promise.all(
  //   locations.map(async (e) => {
  //     const location = await getLocation(e);
  //     await createLocation(location);
  //   })
  // );

  // Create pokemons
  await Promise.all(
    pokemons.map(async (e) => {
      const pokemon = await getPokemon(e);
      await createPokemon(pokemon);
    })
  );
};

loadAll();