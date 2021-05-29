import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MoviesComponent } from './movies/movies.component';

import { SearchResultsComponent } from './search-results/search-results.component';
import { TrendingMoviesComponent } from './trending-movies/trending-movies.component';

const routes: Routes = [
  { path : '' , redirectTo : 'movies' , pathMatch : 'full'},
  { path : 'movies' , component : MoviesComponent},
  { path : 'movie-details' , component : MovieDetailsComponent},
  { path : 'search' , component : SearchResultsComponent},
  {path : 'trending-movies' , component : TrendingMoviesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
