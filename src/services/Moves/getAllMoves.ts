import axios from "axios";
const logger = require("pino")();

export const getAllMoves = async (
  url: string,
) => {
  try {
    const location = await axios.get(url);
    const move = {
      move_id: location.data.id,
      name: location.data.name,
      pp: location.data.pp,
      power: location.data.power
    }
    return move;
  } catch (error) {
    logger.error(`Failed to get locations ${error}`);
    throw error;
  }
};
