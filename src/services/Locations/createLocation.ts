import axios from "axios";
import { enviromentVariables } from "../../config/envVariables";
import pino from "pino";
import rateLimit from "axios-rate-limit";

const https = rateLimit(axios.create(), {
  maxRequests: 9,
  perMilliseconds: 10000,
  maxRPS: 9,
});
const logger = pino();
const { API_URL, API_KEY_HS } = enviromentVariables;
const headers = {
  Authorization: `Bearer ${API_KEY_HS}`,
};

const createLocation = async (ubication: Ubication) => {
  const generation = ubication.game_indices.reduce<string[]>((acc, e) => {
    acc.push(e.generation.name);
    return acc;
  }, []);

  const properties = {
    name: ubication.name,
    number_of_areas: ubication.areas.length,
    location_id: ubication.id,
    region: ubication.region.name,
    generation: generation.join(", "),
  };

  try {
    await https.post(
      `${API_URL}/companies`,
      { properties: properties },
      { headers }
    );
    logger.info(
      `The location ${ubication.name} has been successfully created in HubSpot.`
    );
  } catch (error) {
    logger.error(
      `An error occurred while attempting to create the Pokemon ${ubication.name} in HubSpot: ${error}. `
    );
  }
};

export { createLocation };
