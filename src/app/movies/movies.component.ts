import { HttpClient } from '@angular/common/http'; 
import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { MainServiceService } from '../main-service.service';

declare const $: any;

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  constructor( private http:HttpClient , private service:MainServiceService , private router : Router){
  }

  
  PopularMovies:any;
  trendingMovies:any;
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
      this.PopularMovies = data;
      //console.log(this.PopularMovies)

      setTimeout(() => {
        $('#popular-movies-slider').owlCarousel({
          loop:true,
          margin:10,
          nav:true,
          navText: ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"],
          responsive:{
              0:{
                  items:1
              },
              600:{
                  items:2
              },
              1000:{
                  items:4
              }
          }
      })
      }, 200);
    })
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
      console.log(this.trendingMovies.total_pages);
      
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

  goToSearchPage(searchedWord:any){
    this.router.navigate(['/search'], { queryParams: { query: JSON.stringify(searchedWord)}});
  }

  keyDownFunction(event:any , searchedWord:any) {
    if (event.keyCode === 13) {
      console.log(event);
      this.goToSearchPage(searchedWord);
      
    }
  }

  ngOnInit(): void {
    this.getPopularMovies();
    this.getTrendingMovies();
    this.getPage(this.p);
  }

}