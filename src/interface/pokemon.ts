export interface PokemonTypeMapping {
  [key: number]: string
}
export interface PokemonType {
  id: number
  name: string
}
export interface Filter {
  pageIndex: number
  pageSize: number
  sort: string
  type: string | undefined
}
