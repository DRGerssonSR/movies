import { Component } from '@angular/core';
import { GetMoviesService } from './services/get-movies.service';
import { Movie } from './models/movie.interface';
import { MovieFilter } from './models/movie-filter.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'THE BEST MOVIES';
  movies : Movie[] = [];
  genres : string[] = [];
  searchObject: MovieFilter = {
    term: '',
    genre: [],
    allSelected: true
  };
  constructor(
    private getMoviesService: GetMoviesService
  ) { }

  ngOnInit() {
    this.getMoviesService.getMovies().then(({movies,genres}) => {
      this.movies = movies;
      this.genres = genres;
      this.searchObject.genre = this.genres;
    });
  }

  updateSearchTerm(newTerm: string) {
    this.searchObject = {
      ...this.searchObject,
      term: newTerm
    };
  }

  updateGenres(genre: string, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    const newGenres = isChecked ? [...this.searchObject.genre, genre] : this.searchObject.genre.filter(g => g !== genre);
    this.searchObject = {
      ...this.searchObject,
      genre: newGenres,
      allSelected: newGenres.length === this.genres.length
    }
  }

}
