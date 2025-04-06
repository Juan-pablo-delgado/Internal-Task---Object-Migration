import axios from "axios";
import { enviromentVariables } from "../../config/envVariables";
import pino from "pino";
import rateLimit from 'axios-rate-limit';

const https = rateLimit(axios.create(), { maxRequests: 15, perMilliseconds: 1000, maxRPS: 15 });
const logger = pino();
const { API_URL, API_KEY_HS } = enviromentVariables;
const headers = {
  Authorization: `Bearer ${API_KEY_HS}`,
};

const getMovesFromHS = async () => {
  const hs_moves = await https
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
  const response = await https.get(
    `https://api.hubapi.com/crm/v3/properties/contact/types`,
    { headers }
  );
  return response.data.options;
};

const createOption = async (option: string, options: any[]) => {
  options.push({ label: option, value: option, hidden: false });
  const newOptions = options;
  try {
    await https.patch(
      `https://api.hubapi.com/crm/v3/properties/contact/types`,
      { options: newOptions },
      { headers },
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
  const associationMoves: { id: number }[] = [];
  const hs_moves = await getMovesFromHS();
  const types: string[] = pokemon.types?.reduce<string[]>((acc, e) => {
    acc.push(e.type?.name);
    return acc;
  }, []) ?? [];
  await Promise.all(
    types.map(async (element) => {
      !listTypes.some((item) => item.label === element)
        ? await createOption(element, listTypes)
        : null;
    })
  );
  try {
    const properties = {
      pokedex_id: pokemon?.id,
      firstname: pokemon?.name,
      hp: getStat(pokemon?.stats, "hp"),
      attack: getStat(pokemon?.stats, "attack"),
      defense: getStat(pokemon?.stats, "defense"),
      special_defense: getStat(pokemon?.stats, "special-defense"),
      special_attack: getStat(pokemon?.stats, "special-attack"),
      speed: getStat(pokemon?.stats, "speed"),
      types: types.join(";"),
    };
    pokemon?.moves?.map((poke) => {
      hs_moves?.find((e: any) => {
        e.properties?.name === poke.move?.name &&
          associationMoves.push({ id: e.properties?.hs_object_id });
      })
      return;
    });

    const associations = associationMoves.map((e) => {
      return {
        "types": [
          {
            "associationCategory": "USER_DEFINED",
            "associationTypeId": 60
          }
        ],
        "to": {
          "id": e.id,
        },
      };
    })
    await https.post(`${API_URL}/contacts`, {
      properties, associations
    }, { headers });
    logger.info(
      `The Pokemon ${pokemon?.name} has been successfully created in HubSpot.`
    );
  } catch (error) {
    logger.error(
      `An error occurred while attempting to create the Pokémon ${pokemon?.name} in HubSpot: ${error}. `
    );
  }
};

export { createPokemon };
