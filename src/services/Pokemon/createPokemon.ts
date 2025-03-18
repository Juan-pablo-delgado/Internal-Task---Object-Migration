import axios from "axios";
import { getAllLocations } from "../Locations/getAllLocations";
import { createLocation } from "../Locations/createLocation";
import { getAllMoves } from "../Moves/getAllMoves";
import { create } from "domain";
import { createMove } from "../Moves/createMove";
const logger = require("pino")();

import {  enviromentVariables } from "../../config/envVariables";
const { API_URL, API_KEY_HS } = enviromentVariables;


const headers = {
  Authorization: `Bearer ${API_KEY_HS}`,
};

const searhcStat = (stats: Stat[], stat: string): number => {
  try {
    return stats.filter((e) => {
      return e.stat.name === stat;
    })[0].base_stat;
  } catch (error) {
    logger.error(`Stat ${stat} not found`);
    return 0;
  }
};

const searchTypes = (types: Type[]): string[] => {
  const type: string[] = [];
  try {
    types.forEach((e) => {
      type.push(e.type.name);
    });
    return type;
  } catch (error) {
    logger.error("types not found");
    return type;
  }
};

export const createPokemon = async (pokemon: Pokemon) => {
  const newPokemon = {
    pokedex_id: pokemon.id,
    firstname: pokemon.name,
    hp: searhcStat(pokemon.stats, "hp"),
    attack: searhcStat(pokemon.stats, "attack"),
    defense: searhcStat(pokemon.stats, "defense"),
    special_defense: searhcStat(pokemon.stats, "special-defense"),
    special_attack: searhcStat(pokemon.stats, "special-attack"),
    speed: searhcStat(pokemon.stats, "speed"),
    types: searchTypes(pokemon.types).join(";"),
  };

  const locationAreas = await getAllLocations(pokemon.location_area_encounters);
  const locationAssociations = await Promise.all(
    locationAreas.map(async (area) => {
      return await createLocation(area);
    })
  );

  const moves = await Promise.all(
    pokemon.moves.map(async (move) => {
      return await getAllMoves(move.move.url);
    })
  );

  const moveAssociations = await Promise.all(
    moves.map(async (move) => {
      return await createMove(move);
    })
  );

  // const associations = [...moveAssociations.filter((e) => e !== null)];
  const associations = [
    ...locationAssociations,
    ...moveAssociations.filter((e) => e !== null),
  ];
  try {
    axios.post(
      `${API_URL}/contacts`,
      {
        properties: newPokemon,
        associations,
      },
      { headers }
    );
    logger.info(`Pokemon ${pokemon.name} created correctly in HubSpot`);
  } catch (error) {
    logger.error(`Failed to load Pokemon ${pokemon.name}: ${error}`);
  }
};
