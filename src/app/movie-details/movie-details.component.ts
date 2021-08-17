import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer , SafeResourceUrl} from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MainServiceService } from '../main-service.service';

declare const $: any;
declare var TweenMax: any;
declare var Power0: any;
declare var ScrollMagic: any;
declare var controller: any;
declare var pageHeaderEffect: any;
declare var scrollToTop: any;

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  constructor( private sanitizer: DomSanitizer , private service : MainServiceService , private http : HttpClient , private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      let id = params['id'];
      this.movieId = id;
    });
  }



  apiKey = this.service.apiKey;
  baseUrl = this.service.baseUrl;
  movieId:any;
  movieDetails:any;
  movieVideos:any;
  secureVideoUrl: SafeResourceUrl = '';
  backdrops:any;
  lightGalleryList:any = [];
  movieCover:any;
  movieTime:any =  {
    hours : 0,
    minutes : 0
  }

  getMovieDetails(id:any){
    let url = `https://api.themoviedb.org/3/movie/${id}`;
    return this.http.get(url , {
      params : {
        api_key : this.apiKey
      }
    }).subscribe(data=>{
      this.movieDetails = data;
      this.movieTime.hours = Math.floor(this.movieDetails.runtime / 60)
      this.movieTime.minutes = this.movieDetails.runtime % 60
      console.log(this.movieTime);
    })
  }

  getMovieVideo(id:any){
    id = this.movieId;
    let url = `https://api.themoviedb.org/3/movie/${id}/videos`;
    return this.http.get(url , {
      params :{
        api_key : this.apiKey
      }
    }).subscribe(data=>{
      this.movieVideos = data;
      this.secureVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.movieVideos.results[0].key}`);
      console.log('this.secureVideoUrl');
      console.log(this.secureVideoUrl);
    })
  }
 

  getBackdrops(id:any){
    id = this.movieId;
    let url = `https://api.themoviedb.org/3/movie/${id}/images`;

    return this.http.get(url,{
      params : {
        api_key : this.service.apiKey
      }
    }).subscribe(data=>{
      this.backdrops = data;

      console.log('data');
      console.log(data);
      

      for(let i=0; i<this.backdrops.backdrops.length; i++){
        this.lightGalleryList.push({
          src: `https://image.tmdb.org/t/p/w1280/${this.backdrops.backdrops[i].file_path}`,
          thumb: `https://image.tmdb.org/t/p/w1280/${this.backdrops.backdrops[i].file_path}`
        })
      }

      this.movieCover = `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${this.backdrops.backdrops[0].file_path}`
    })
  }


  initLightGallery(index:any){
    let activeSlideNum = index;
    $("#lightgallery").lightGallery({
      dynamic: true,
      dynamicEl: this.lightGalleryList,
      index : activeSlideNum
      });
  }
 



 
  ngOnInit(): void { 
    console.log(this.getMovieVideo(this.movieId))
    this.getMovieDetails(this.movieId);
    this.getBackdrops(this.movieId); 
    scrollToTop();
  }

  ngAfterViewInit() {
    pageHeaderEffect();    
  }
}
