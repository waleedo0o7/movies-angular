import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MoviesComponent } from './movies/movies.component';
import { PopularMoviesComponent } from './popular-movies/popular-movies.component';

import { SearchResultsComponent } from './search-results/search-results.component';
import { TrendingMoviesComponent } from './trending-movies/trending-movies.component';

const routes: Routes = [
  { path : '' , redirectTo : 'movies' , pathMatch : 'full'},
  { path : 'movies' , component : MoviesComponent},
  { path : 'movie-details' , component : MovieDetailsComponent},
  { path : 'popular-movies' , component : PopularMoviesComponent },
  { path : 'trending-movies' , component : TrendingMoviesComponent },
  { path : 'search' , component : SearchResultsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
