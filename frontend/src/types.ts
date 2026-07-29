export interface Movie {
  id: number
  title: string
  year: number
  genre: string[]
  plot: string
  similarity: number
  poster: string
  director: string
  writer: string
  cast: string[]
  runtime: string
  country: string
  language: string
  rating: number
  matchedKeywords: string[]
}

export type Page =
  | { name: 'home' }
  | { name: 'results'; query: string }
  | { name: 'details'; movieId: number; fromQuery: string }
