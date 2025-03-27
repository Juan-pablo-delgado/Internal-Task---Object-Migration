import axios from "axios";
const logger = require("pino")();

const getMove = async (move: Moves): Promise<Locations> => {
  try {
    const data = await axios.get(move.url);
    logger.info(`move ${move.name} load correctly`);
    return data.data;
  } catch (error) {
    logger.error(`Failed to load move: ${error}`);
    throw error;
  }
};

export { getMove };
