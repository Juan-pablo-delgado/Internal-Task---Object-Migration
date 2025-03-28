import axios from "axios";
const logger = require("pino")();
import { enviromentVariables } from "../../config/envVariables";
const { API_URL, API_KEY_HS } = enviromentVariables;

const headers = {
  Authorization: `Bearer ${API_KEY_HS}`,
};

const getTypes = async (): Promise<[]> => {
  const response = await axios.get(
    `https://api.hubapi.com/crm/v3/properties/moves/power`,
    { headers }
  );
  return response.data.options;
};

const createOption = async (option: number, options: any[]) => {
  options.push({
    label: option.toString(),
    value: option.toString(),
    hidden: false,
  });
  const newOptions = options;
  try {
    await axios.patch(
      `https://api.hubapi.com/crm/v3/properties/moves/power`,
      { options: newOptions },
      { headers }
    );
    logger.info(
      `The new option, ${option}, has been incorporated into the power.`
    );
  } catch (error) {
    logger.error(
      `Failed to create the option ${option} in power error: ${error}`
    );
  }
};

const createMove = async (move: Move) => {
  const listTypes: any[] = await getTypes();

  const properties = {
    move_id: move.id,
    name: move.name,
    pp: move.pp,
    power: move.power,
  };

  !listTypes.some((item) => item.label === move.power.toString())
    ? await createOption(move.power, listTypes)
    : null;

  try {
    await axios.post(`${API_URL}/moves`, { properties }, { headers });
    logger.info(
      `The Move ${move.name} has been successfully created in HubSpot.`
    );
  } catch (error) {
    logger.error(
      `An error occurred while attempting to create the Pokemon ${move.name} in HubSpot: ${error}. `
    );
    console.error(error);
  }
};

export { createMove };
