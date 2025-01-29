import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit{
  data$: Observable<any>=of([]);
  filtered$: Observable<any>=of([]);
  sorted$: Observable<any>=of([]);
  constructor(private ms: MovieService,private r:Router){}
  ngOnInit(): void {
    this.getAllMovies();
  }
  
  getAllMovies(){
    this.data$=this.ms.getAllMovies();
    this.filtered$=this.data$;
    this.sorted$=this.filtered$;
  }

  onDelete(id: any){
    this.ms.deleteMovie(id).subscribe(()=>{
      this.ngOnInit();
    })
  }

  onEdit(id: any){
    this.r.navigate([`/edit/${id}`]);
  }

  onView(id: any){
    this.r.navigate([`/view/${id}`]);

  }

  
}
