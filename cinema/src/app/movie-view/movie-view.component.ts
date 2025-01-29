import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Movie } from '../movie.model';

@Component({
  selector: 'app-movie-view',
  templateUrl: './movie-view.component.html',
  styleUrls: ['./movie-view.component.css']
})
export class MovieViewComponent implements OnInit{
  viewData$!:Movie;  
  movieId: any;
  constructor(private ms: MovieService,private r: Router,private ar: ActivatedRoute){}
  
  ngOnInit(): void {
    this.movieId=this.ar.snapshot.paramMap.get('id')!;
    this.getInfo(this.movieId);
      
    
  }

  getInfo(id: any){
    this.ms.getById(id).subscribe((d)=>
    {
      this.viewData$=d;
    });
  }



}
