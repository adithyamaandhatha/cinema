import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { Router } from '@angular/router';
import { Observable, of, map } from 'rxjs';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit{
  data$: Observable<any>=of([]);
  filtered$: Observable<any>=of([]);
  sorted$: Observable<any>=of([]);
  searchText: string='';
  sortBy: string='';
  isAscending: boolean = true;

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

  // onFilter(){
  //   // if(this.searchText){
  //   //   this.filtered$=this.data$.pipe(map((movies)=>
  //   //     {
  //   //     return movies.filter((movie: any)=>
  //   //     {
  //   //       return movie.id.includes(this.searchText) || movie.director.toLowerCase().includes(this.searchText.toLowerCase()) ||
  //   //       movie.title.toLowerCase().includes(this.searchText.toLowerCase());

  //   //     })
  //   //   }))
  //   // }
  //   if(this.searchText){
  //     this.filtered$=this.data$.pipe(map((movies)=>{
  //       return movies.filter((movie: any)=>{
  //         return movie.id.includes(this.searchText) || movie.director.toLowerCase().includes(this.searchText.toLowerCase()) ||
  //          movie.title.toLowerCase().includes(this.searchText.toLowerCase());
  //       })
  //     }));
  //     this.sorted$=this.filtered$;
  //   }
  //   else{
  //     this.filtered$=this.data$;
  //     this.sorted$=this.filtered$;
  //   }
  // }

  onSortingMethod(){
    // if(this.sortBy){
    //   this.sorted$=this.filtered$.pipe(map((movies)=>{
    //     return movies.sort((a: any,b: any)=>{
    //       return a[this.sortBy].localeCompare(b[this.sortBy]);
    //     })
    //   }));
      
    // }
    // else{
    //   this.ngOnInit();
    // }
    if(this.sortBy){
      this.sorted$=this.filtered$.pipe(map((movies)=>{
        return movies.sort((a: any,b: any)=>{
          if(a[this.sortBy]<b[this.sortBy]){
            return this.isAscending ? -1 : 1;
          }
          else if(a[this.sortBy]>b[this.sortBy]){
            return this.isAscending ? 1 : -1;
          }
          return 0;
        })
      }));
      
    }
    else{
      this.ngOnInit();
    }
    
  }

  onReload(){
    this.ngOnInit();
  }

  onSortMd(){
    this.sorted$=this.filtered$.pipe(map((moives)=>{
      return moives.sort((a: any,b: any)=>{
        return a.musicDirector.localeCompare(b.musicDirector)
      });
    }))
  }
  

  
}
