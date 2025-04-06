import axios from "axios";
import pino from "pino";

const logger = pino();

const getLocation = async (location: Locations): Promise<Ubication> => {
  try {
    const data = await axios.get(location.url);
    logger.info(`Location ${location.name} load correctly`);
    return data.data;
  } catch (error) {
    logger.error(`Failed to load location: ${error}`);
    throw error;
  }
};

export { getLocation };
