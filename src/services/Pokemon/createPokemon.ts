import axios from "axios";
import { enviromentVariables } from "../../config/envVariables";

const logger = require("pino")();
const { API_URL, API_KEY_HS } = enviromentVariables;
const headers = {
  Authorization: `Bearer ${API_KEY_HS}`,
};

const getMovesFromHS = async () => {
  const hs_moves = await axios
    .get(`https://api.hubapi.com/crm/v3/objects/moves?properties=name`, {
      headers,
    })
    .then((res) => res.data);

  return hs_moves.results;
};

const getStat = (stats: Stat[], stat: string): number => {
  const valueBase = stats.find((e) => {
    return e.stat.name === stat;
  });
  return valueBase ? valueBase.base_stat : 0;
};

const getTypes = async (): Promise<[]> => {
  const response = await axios.get(
    `https://api.hubapi.com/crm/v3/properties/contact/types`,
    { headers }
  );
  return response.data.options;
};

const createOption = async (option: string, options: any[]) => {
  options.push({ label: option, value: option, hidden: false });
  const newOptions = options;
  try {
    await axios.patch(
      `https://api.hubapi.com/crm/v3/properties/contact/types`,
      { options: newOptions },
      { headers }
    );
    logger.info(
      `The new option, ${option}, has been incorporated into the Types.`
    );
  } catch (error) {
    logger.error(
      `Failed to create the option ${option} in Types error: ${error}`
    );
  }
};

const createPokemon = async (pokemon: Pokemon) => {
  const listTypes: any[] = await getTypes();
  const types: string[] = pokemon.types.reduce<string[]>((acc, e) => {
    acc.push(e.type.name);
    return acc;
  }, []);
  const properties = {
    pokedex_id: pokemon.id,
    firstname: pokemon.name,
    hp: getStat(pokemon.stats, "hp"),
    attack: getStat(pokemon.stats, "attack"),
    defense: getStat(pokemon.stats, "defense"),
    special_defense: getStat(pokemon.stats, "special-defense"),
    special_attack: getStat(pokemon.stats, "special-attack"),
    speed: getStat(pokemon.stats, "speed"),
    types: types.join(";"),
  };

  await Promise.all(
    types.map(async (element) => {
      !listTypes.some((item) => item.label === element)
        ? await createOption(element, listTypes)
        : null;
    })
  );

  const hs_moves = await getMovesFromHS();
  console.log(pokemon.moves[0].move.name);
  console.log(hs_moves);
  // try {
  //   axios.post(`${API_URL}/contacts`, { properties }, { headers });
  //   logger.info(
  //     `The Pokemon ${pokemon.name} has been successfully created in HubSpot.`
  //   );
  // } catch (error) {
  //   logger.error(
  //     `An error occurred while attempting to create the Pokémon ${pokemon.name} in HubSpot: ${error}. `
  //   );
  // }
};

export { createPokemon };
