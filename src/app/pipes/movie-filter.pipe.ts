import { Pipe, PipeTransform } from '@angular/core';
import { Movie } from '../models/movie.interface';
import { MovieFilter } from '../models/movie-filter.interface';

@Pipe({
  name: 'movieFilter'
})
export class MovieFilterPipe implements PipeTransform {

  transform(movies: Movie[], searchObject:MovieFilter) {
    if (!movies) return []
    const { term, allSelected} = searchObject;
    if (!term && allSelected) return movies;

    const searchTerm = term.toLowerCase();
    return movies.filter(movie => {
        const title = movie.title.toLowerCase();
        const description = movie.description.toLowerCase();
        return (title.includes(searchTerm) || description.includes(searchTerm)) 
          && (allSelected || searchObject.genre.includes(movie.genre));
    });
  }

}
