import axios from "axios";
const logger = require("pino")();

const API_URL = process.env.API_URL!;
const API_KEY = process.env.API_KEY_HS;
const headers = {
  Authorization: `Bearer ${API_KEY}`,
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
