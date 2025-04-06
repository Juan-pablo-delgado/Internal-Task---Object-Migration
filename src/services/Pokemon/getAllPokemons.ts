import axios from "axios";
import pino from "pino";

const logger = pino();

const getAllPokemons = async (
  url: string,
  limit: number
): Promise<Pokemons[]> => {
  try {
    const pokemons = await axios.get(`${url}/pokemon?limit=${limit}`);
    logger.info("All pokemons load");
    return pokemons.data.results;
  } catch (error) {
    logger.error(`Failed to load pokemons: ${error}`);
    return [];
  }
};

export { getAllPokemons };
