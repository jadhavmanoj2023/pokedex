const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL;


export const pokemonService = {
  async getPokemonList(offset = 0, limit = 20) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/list?offset=${offset}&limit=${limit}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch Pokemon list');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching Pokemon list:', error);
      throw error;
    }
  },

  async getPokemonDetails(nameOrId) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/${nameOrId.toLowerCase()}`
      );
      if (!response.ok) {
        throw new Error('Pokemon not found');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching Pokemon details:', error);
      throw error;
    }
  }
};