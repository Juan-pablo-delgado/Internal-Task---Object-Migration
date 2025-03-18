import axios from "axios";
const logger = require("pino")();
import {  enviromentVariables } from "../../config/envVariables";
const { API_URL, API_KEY_HS } = enviromentVariables;

const headers = {
  Authorization: `Bearer ${API_KEY_HS}`,
};

export const createLocation = async (
  locationArea: Location_area_encounters,
) => {

  const newLocation = {
    name: locationArea.location_area.name,
    location_id: Number(locationArea.location_area.url.match(/(\d+)\/$/)![1]),
  };

  try {
    const id = await axios.post(`${API_URL}/companies`,
      { properties: newLocation },
      { headers }
    ).then((res) => {
      return (res.data.id)
    })
    logger.info(`Pokemon ${locationArea.location_area.name} created correctly in HubSpot`);
    return {
      "types": [
        {
          "associationCategory": "HUBSPOT_DEFINED",
          "associationTypeId": 279
        }
      ],
      "to": {
        "id": id
      }
    }
  } catch (error) {
    logger.error(
      `Failed to load Pokemon ${locationArea.location_area.name}: ${error}`
    );
    return null;
  }
};
