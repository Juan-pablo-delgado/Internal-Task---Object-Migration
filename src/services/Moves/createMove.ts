import axios from "axios";
const logger = require("pino")();
import {  enviromentVariables } from "../../config/envVariables";
const { API_URL, API_KEY_HS } = enviromentVariables;

const headers = {
  Authorization: `Bearer ${API_KEY_HS}`,
};

export const createMove = async (
  move: MoveInfo,
) => {
  try {
    const id = await axios.post(`${API_URL}/moves`,
      { properties: move },
      { headers }
    ).then((res) => {
      return (res.data.id)
    })
    logger.info(`Move ${move.name} created correctly in HubSpot`);
    return {
      "types": [
        {
          "associationCategory": "HUBSPOT_DEFINED",
          "associationTypeId": 60
        }
      ],
      "to": {
        "id": id
      }
    }
  } catch (error) {
    logger.error(
      `Failed to load Move ${move.name}: ${error}`
    );
    return null;
  }
};
