export interface BackendMovie {
  id: number
  title: string
  year?: string | number
  runtime?: string
  genre: string
  director?: string
  writer?: string
  actors?: string
  plot: string
  language?: string
  country?: string
  poster?: string
  rating?: string | number
  score: number
}

export interface SearchResponse {
  query: string
  total_results: number
  results: BackendMovie[]
}

const API_BASE = 'http://127.0.0.1:5000'

export async function searchMovies(query: string): Promise<SearchResponse> {
  const response = await fetch(`${API_BASE}/search`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  })

  if (!response.ok) {
    throw new Error('Search request failed')
  }

  return response.json()
}

export interface SystemStats {
  movies: number
  features: number
  search_time: number
  current_results: number
}

export async function getSystemStats(): Promise<SystemStats> {
  const response = await fetch('http://127.0.0.1:5000/stats')

  if (!response.ok) {
    throw new Error('Failed to fetch system statistics')
  }

  return response.json()
}

