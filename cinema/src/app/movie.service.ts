import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from './movie.model';
import { Observable,map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl: string = "https://ideal-eureka-x4qxp5v56rrf6p94-3000.app.github.dev/movies";

  constructor(private http: HttpClient) { }

  getAll(): Observable<any>{
    return this.http.get(this.apiUrl);

  }

  getById(id: any): Observable<any>{
    return this.http.get(`${this.apiUrl}/${id}`).pipe(map((movies)=>{
      if(Array.isArray(movies)){
        return movies;
      }
      else{
        return [movies];
      }
    }))
  }

  add(movie: Movie): Observable<any>{
    return this.http.post(this.apiUrl,movie);
  }

  update(id: any,movie: Movie): Observable<any>{
    return this.http.put(this.apiUrl+"/"+id,movie);
  }

  deleteById(id: any): Observable<any>{
    return this.http.delete(this.apiUrl+"/"+id);
  }
}
