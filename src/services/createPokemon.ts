import axios from "axios";
import { getAllLocations } from "./getAllLocations";
import { createLocation } from "./createLocation";
const logger = require("pino")();

const API_URL = process.env.API_URL!;
const API_KEY = process.env.API_KEY_HS;
const headers = {
  Authorization: `Bearer ${API_KEY}`,
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
  locationAreas.forEach(async (area) => {
    await createLocation(area, locationAreas.length);
  });

  // try {
  //   axios.post(
  //     `${API_URL}/contacts`,
  //     {
  //       properties: newPokemon,
  //     },
  //     {
  //       headers,
  //     }
  //   );
  //   logger.info(`Pokemon ${pokemon.name} created correctly in HubSpot`);
  // } catch (error) {
  //   logger.error(`Failed to load Pokemon ${pokemon.name}: ${error}`);
  // }
};
