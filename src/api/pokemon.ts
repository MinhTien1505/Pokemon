import { PokemonParams } from './interface/pokemon.ts'
import apiClient from './clients.ts'

export default {
  list(params: PokemonParams) {
    return apiClient.get('/api/pokemon-api/pokemons', {
      params,
    })
  },
  typeList() {
    return apiClient.get('/api/pokemon-api/types')
  },
  downloadSprite(id: string) {
    return apiClient.get(`/api/pokemon-api/pokemons/${id}/sprite`, {
      responseType: 'blob',
    })
  },
}
