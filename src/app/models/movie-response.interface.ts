import { Movie } from "./movie.interface";

export interface MovieResponse {
    movies: Movie[]
    genres: string[]
}