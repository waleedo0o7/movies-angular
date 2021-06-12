import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainServiceService } from '../main-service.service';

@Component({
  selector: 'app-popular-movies',
  templateUrl: './popular-movies.component.html',
  styleUrls: ['./popular-movies.component.scss']
})
export class PopularMoviesComponent implements OnInit {

  constructor( private http:HttpClient , private service:MainServiceService , private router : Router){
  }

  
  allMovies:any; 
  apiKey = this.service.apiKey;
  baseUrl = this.service.baseUrl;

  
  p: number = 1;
  itemsPerPage = 20;
  totalItems: any;
  totalPages:any ;

 




  getPopularMovies(){
    let url = "https://api.themoviedb.org/3/movie/popular";
    return this.http.get(url , {
      params : {
        api_key : this.apiKey
      }
    }).subscribe(data=>{
      this.allMovies = data;      
    })
  }
  
  getMovieDetails(id:string){
    let url = `https://api.themoviedb.org/3/movie/${id}`;
    return this.http.get(url , {
      params : {
        api_key : this.apiKey
      }
    }).subscribe(data=>{
      this.service.movieDetails = data;
    })
  }

  viewMovieDetals(id:any){
    this.router.navigate(['/movie-details'], { queryParams: { id: JSON.stringify(id)}});
  }
  
  getPage(pageNum : any) {
    const url = `https://api.themoviedb.org/3/movie/popular`;
    this.http.get(url , {
      params : {
        api_key : this.apiKey,
        page : pageNum
      }
    }).subscribe((data: any) => {
      this.allMovies =  data;
      this.totalItems = data.total_results
    })
  }

  ngOnInit(): void {
    this.getPopularMovies();
    this.getPage(this.p);
  }

}
