const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8081/api/v1/pokemon';

async function handleResponse(response) {
  let data = null;

  try {
    data = await response.json();
  } catch (e) {
    // response has no body
  }

  if (!response.ok) {
    const error = new Error(data?.message || "Something went wrong");
    error.status = data?.status || response.status;
    error.code = data?.error;
    throw error;
  }

  return data;
}

export const pokemonService = {
  async getPokemonList(offset = 0, limit = 20) {
    const response = await fetch(
      `${API_BASE_URL}/list?offset=${offset}&limit=${limit}`
    );
    return handleResponse(response);
  },

  async getPokemonDetails(nameOrId) {
    const sanitized = nameOrId.trim().toLowerCase();

    const response = await fetch(`${API_BASE_URL}/${sanitized}`);
    return handleResponse(response);
  }
};
