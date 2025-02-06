import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { Router } from '@angular/router';
import { Observable, of, map } from 'rxjs';
import { Movie } from '../movie.model';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit{
  
  sorted: any[] =[];
  data: any;
  filtered: any;
  searchText: string='';
  sortBy: string='';
  isAscending: boolean=true;
  constructor(private ms: MovieService,private r: Router){

  }
  ngOnInit(): void {
    this.ms.getAll().subscribe({
      next: (r)=>{
        this.data=r;
        this.sorted=this.sortByDef(this.data);
    // console.log(this.data)

      },
      error: (error)=>{
        console.error("Error triggered: ",error);
      }
    });
    

  }
  

  onDelete(id: any){
    this.ms.deleteById(id).subscribe({
      next: ()=>{
        this.ngOnInit();
      }
    });
  }

  onEdit(id: any){
    this.r.navigate(['/edit/'+id]);
  }

  sortByDef(movie: any[]): any{
    return movie.sort((a: any,b: any)=>{
      return a.title.localeCompare(b.title);
    })
  }

  onSortingMethod(){
    if(this.sortBy){
      this.sorted=this.data.sort((a: any,b: any)=>{
        return this.isAscending ? a[this.sortBy].localeCompare(b[this.sortBy]) : b[this.sortBy].localeCompare(a[this.sortBy])
      })
    }
    this.sorted=this.data;
  }

  onSearch(){
    if(this.searchText){
      this.filtered=this.data.filter((d: any)=>{
        return d.toString().toLowerCase().includes(this.searchText.toLowerCase());
      });
      this.sorted=this.filtered;
    }
    this.filtered=this.data;
    this.sorted=this.filtered;
    
  }



  
  // data$: Observable<any>=of([]);
  // filtered$: Observable<any>=of([]);
  // sorted$: Observable<any>=of([]);
  // searchText: string='';
  // sortBy: string='';
  // isAscending: boolean = true;

  // constructor(private ms: MovieService,private r:Router){}
  // ngOnInit(): void {
  //   this.getAllMovies();
  // }
  
  // getAllMovies(){
  //   this.data$=this.ms.getAllMovies();
  //   this.filtered$=this.data$;
  //   this.sorted$=this.filtered$;
  //   this.onSortMd();
  // }

  // onDelete(id: any){
  //   this.ms.deleteMovie(id).subscribe(()=>{
  //     this.ngOnInit();
  //   })
  // }

  // onEdit(id: any){
  //   this.r.navigate([`/edit/${id}`]);
  // }

  // onView(id: any){
  //   this.r.navigate([`/view/${id}`]);

  // }

  // // onFilter(){
  // //   // if(this.searchText){
  // //   //   this.filtered$=this.data$.pipe(map((movies)=>
  // //   //     {
  // //   //     return movies.filter((movie: any)=>
  // //   //     {
  // //   //       return movie.id.includes(this.searchText) || movie.director.toLowerCase().includes(this.searchText.toLowerCase()) ||
  // //   //       movie.title.toLowerCase().includes(this.searchText.toLowerCase());

  // //   //     })
  // //   //   }))
  // //   // }
  // //   if(this.searchText){
  // //     this.filtered$=this.data$.pipe(map((movies)=>{
  // //       return movies.filter((movie: any)=>{
  // //         return movie.id.includes(this.searchText) || movie.director.toLowerCase().includes(this.searchText.toLowerCase()) ||
  // //          movie.title.toLowerCase().includes(this.searchText.toLowerCase());
  // //       })
  // //     }));
  // //     this.sorted$=this.filtered$;
  // //   }
  // //   else{
  // //     this.filtered$=this.data$;
  // //     this.sorted$=this.filtered$;
  // //   }
  // // }

  // onSortingMethod(){
  //   // if(this.sortBy){
  //   //   this.sorted$=this.filtered$.pipe(map((movies)=>{
  //   //     return movies.sort((a: any,b: any)=>{
  //   //       return a[this.sortBy].localeCompare(b[this.sortBy]);
  //   //     })
  //   //   }));
      
  //   // }
  //   // else{
  //   //   this.ngOnInit();
  //   // }
  //   if(this.sortBy){
  //     this.sorted$=this.filtered$.pipe(map((movies)=>{
  //       return movies.sort((a: any,b: any)=>{
  //         if(a[this.sortBy]<b[this.sortBy]){
  //           return this.isAscending ? -1 : 1;
  //         }
  //         else if(a[this.sortBy]>b[this.sortBy]){
  //           return this.isAscending ? 1 : -1;
  //         }
  //         return 0;
  //       })
  //     }));
      
  //   }
  //   else{
  //     this.ngOnInit();
  //   }
    
  // }

  // onReload(){
  //   this.ngOnInit();
  // }

  // onSortMd(){
  //   this.sorted$=this.filtered$.pipe(map((moives)=>{
  //     return moives.sort((a: any,b: any)=>{
  //       return a.musicDirector.localeCompare(b.musicDirector)
  //     });
  //   }))
  // }
  

  
}
