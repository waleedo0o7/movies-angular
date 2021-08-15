import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { MainServiceService } from './main-service.service'; 

declare var removeLoadinScreen: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  constructor( private http:HttpClient , private service:MainServiceService){
  }
  
  title = 'movies-app';
  
  testData(){
    for(let i=0 ; i < 500 ; i++){
      this.someArrayOfThings.push({"id" : i })
    }
  }
  someArrayOfThings:any = [
  ]

  p: number = 1;
  collection: any[] = this.someArrayOfThings;  

  ngOnInit() {
    this.testData()
  }

  ngAfterViewInit(){
    removeLoadinScreen();
  }
}