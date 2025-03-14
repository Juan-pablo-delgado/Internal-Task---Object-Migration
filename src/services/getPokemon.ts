import axios from "axios";
const logger = require("pino")();

const getPokemon = async (pokemon: Pokemons): Promise<Pokemon> => {
  try {
    const data = await axios.get(pokemon.url);
    logger.info(`Pokemon ${pokemon.name} load correctly`);
    return data.data;
  } catch (error) {
    logger.error(`Failed to load pokemon: ${error}`);
    throw error;
  }
};

export { getPokemon };
