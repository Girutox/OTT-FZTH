export interface Trending {
  poster_path?: string,
  overview: string,
  id: number,
  original_title: string,
  backdrop_path?: string
}
export interface ResultTrending {
  page: number,
  results: Trending[]
}

export interface Movie {
  poster_path?: string,
  id: number
}
export interface ResultMovie {
  page: number,
  results: Movie[]
}

export interface Genre {
  id: number,
  name: string
}
export interface MovieDetail {
  backdrop_path?: string,
  genres: Genre[],
  original_language: string,
  original_title: string,
  overview?: string,
  release_date: string,
  runtime: number,
  vote_average: number,

}

export interface Parameter {
  movie_id?: number,
  movie_name?: string
}

interface Cast {
  name: string
}
export interface ResultCast {
  id: number,
  cast: Cast[]
}

interface Video {
  name: string,
  key: string,
  type: string,
  published_at: string,

}
export interface ResultVideo {
  id: number,
  results: Video[]
}

export interface Search {
  poster_path?: string,
  id: number,
  title: string
}
export interface ResultSearch {
  page: number,
  results: Search[]
}
