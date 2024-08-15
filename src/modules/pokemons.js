export const API_BASE_URL = 'https://pokeapi.co/api/v2'

export const getPokemonListUrl = () => `${API_BASE_URL}/pokemon?limit=10000`
export const getPokemonDetailUrl = (url) => url