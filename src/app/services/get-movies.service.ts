import { Injectable } from '@angular/core';
import axios from 'axios';
import { MovieResponse } from '../models/movie-response.interface';

@Injectable({
  providedIn: 'root'
})
export class GetMoviesService {

  constructor() { }
  
  async getMovies() {
    try {
      const response =  await axios.get<MovieResponse>('/assets/movies.json')
      return response.data
    }catch (error) {
      console.error('Error:', error)
      return {movies: [], genres: []}
    }
  }
}
