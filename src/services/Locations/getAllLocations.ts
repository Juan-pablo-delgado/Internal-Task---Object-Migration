import axios from "axios";
import pino from "pino";
const logger = pino();

const getAllLocations = async (
  url: string,
  limit: number
): Promise<Pokemons[]> => {
  try {
    const moves = await axios.get(`${url}/location?limit=${limit}`);
    return moves.data.results;
  } catch (error) {
    logger.error(`Failed to load locations: ${error}`);
    return [];
  }
};

export { getAllLocations };
