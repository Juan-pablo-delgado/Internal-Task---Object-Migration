import axios from "axios";
const logger = require("pino")();

const getPokemon = async (pokemon: Pokemons): Promise<any> => {
  try {
    const data = await axios.get(pokemon.url);
    logger.info(`Pokemon ${pokemon.name} load corretly`);
    console.log(data.data);

    return data.data;
  } catch (error) {
    logger.error(`Failed to load pokemon: ${error}`);
    return [];
  }
};

export { getPokemon };
