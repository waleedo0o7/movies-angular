import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainServiceService } from '../main-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})

export class SearchResultsComponent implements OnInit {
  searchResults: any;
  apiKey = this.service.apiKey;
  baseUrl = this.service.baseUrl;
  searchedString:any;
  
  p: number = 1;
  itemsPerPage = 20;
  totalItems: any;
  totalPages:any ;

  constructor( private http:HttpClient , private service:MainServiceService , private router : Router, private activatedRoute: ActivatedRoute){
    this.activatedRoute.queryParams.subscribe(params => {
      let query = params['query'];
      this.searchedString = query.replace(/['"]+/g, ''); 
    });
  }

  goToSearchPage(searchedWord:any){
    this.router.navigate(['/search'], { queryParams: { query: JSON.stringify(searchedWord)}});
    this.getSearchResults(searchedWord)
  }

  getSearchResults(searchedString:any){
    let url = 'https://api.themoviedb.org/3/search/movie';
    return this.http.get(url , {
      params : {
        api_key : this.apiKey,
        query : searchedString
      }
    }).subscribe(data=>{
      this.searchResults = data;
      this.totalItems = this.searchResults.total_results;
      this.totalPages = this.searchResults.total_pages;
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
    const url = 'https://api.themoviedb.org/3/search/movie';
    this.http.get(url , {
      params : {
        api_key : this.apiKey,
        query : this.searchedString,
        page : pageNum
      }
    }).subscribe((data: any) => {
      this.searchResults =  data;
      this.totalItems = data.total_results
    })
  }

  ngOnInit(): void {
    this.getSearchResults(this.searchedString);
    this.getPage(this.p);
  }

}
