import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {
  
  apiKey = "83fe1a54d4bb2106a602073bc9642ca2";
  baseUrl = "https://image.tmdb.org/t/p/";
  movieDetails:any;
  

  constructor(private http:HttpClient) { }

  
}
