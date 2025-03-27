import axios from "axios";
const logger = require("pino")();

const getAllMoves = async (url: string, limit: number): Promise<Pokemons[]> => {
  try {
    const moves = await axios.get(`${url}/move?limit=${limit}`);
    return moves.data.results;
  } catch (error) {
    logger.error(`Failed to load moves: ${error}`);
    return [];
  }
};

export { getAllMoves };
