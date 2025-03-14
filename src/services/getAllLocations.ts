import axios from "axios";
const logger = require("pino")();

export const getAllLocations = async (
  url: string
): Promise<Location_area_encounters[]> => {
  try {
    const location = await axios.get(url);
    return location.data;
  } catch (error) {
    logger.error(`Failed to get locations ${error}`);
    throw error;
  }
};
