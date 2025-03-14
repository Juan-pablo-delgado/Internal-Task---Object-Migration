import axios from "axios";
const logger = require("pino")();

const API_URL = process.env.API_URL!;
const API_KEY = process.env.API_KEY_HS;
const headers = {
  Authorization: `Bearer ${API_KEY}`,
};

export const createLocation = async (
  LocationArea: Location_area_encounters,
  areas: Number
) => {
  console.log(LocationArea);
  const newLocation = {
    name: LocationArea.location_area.name,
    number_of_areas: areas,
    location_id: 0,
  };
  //   try {
  //     axios.post(
  //       `${API_URL}/companies`,
  //       {
  //         properties: newLocation,
  //       },
  //       {
  //         headers,
  //       }
  //     );
  //     logger.info(
  //       `Pokemon ${LocationArea.location_area.name} created correctly in HubSpot`
  //     );
  //   } catch (error) {
  //     logger.error(
  //       `Failed to load Pokemon ${LocationArea.location_area.name}: ${error}`
  //     );
  //   }
};
