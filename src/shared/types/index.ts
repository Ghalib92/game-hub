// Domain types for API responses and data models
export interface Platform {
  id: number
  name: string
  slug: string
}

export interface Genre {
  id: number
  name: string
  image_background: string
}

export interface Game {
  id: number
  name: string
  background_image: string
  parent_platforms: { platform: Platform }[]
  metacritic: number
}

// API response wrapper type used by RAWG
export interface FetchResponse<T> {
  count: number
  results: T[]
}

// Game filter/query state passed through the app
export interface GameQuery {
  genre?: Genre | null
  platform?: Platform | null
  sortOrder?: string
  searchText?: string
}
