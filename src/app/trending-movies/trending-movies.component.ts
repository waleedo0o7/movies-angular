import { HttpClient } from '@angular/common/http';
import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainServiceService } from '../main-service.service';


@Component({
  selector: 'app-popular-movies',
  templateUrl: './trending-movies.component.html',
  styleUrls: ['./trending-movies.component.scss']
})
export class TrendingMoviesComponent implements OnInit {

  constructor( private http:HttpClient , private service:MainServiceService , private router : Router){
  }

  
  trendingMovies:any;
  apiKey = this.service.apiKey;
  baseUrl = this.service.baseUrl;

  p: number = 1;
  itemsPerPage = 20;
  totalItems: any;
  totalPages:any ;

  
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



  getTrendingMovies(){
    let url = "https://api.themoviedb.org/3/trending/all/day";
    return this.http.get(url , {
      params : {
        api_key : this.apiKey
      }
    }).subscribe(data=>{
      this.trendingMovies = data;
      this.totalItems = this.trendingMovies.total_results;
      this.totalPages = this.trendingMovies.total_pages;
      console.log(this.trendingMovies);
      
    })
  }

  getPage(pageNum : any) {
    const url = `https://api.themoviedb.org/3/trending/all/day`;
    this.http.get(url , {
      params : {
        api_key : this.apiKey,
        page : pageNum
      }
    }).subscribe((data: any) => {
      this.trendingMovies =  data;
      this.totalItems = data.total_results
    })
  }




  ngOnInit(): void {
    this.getTrendingMovies();
    this.getPage(this.p);
  }

}
