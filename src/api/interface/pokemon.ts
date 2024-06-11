export interface PokemonParams {
  'page[number]': number
  'page[size]': number
  sort: string
  'filter[type]': string | undefined
}
