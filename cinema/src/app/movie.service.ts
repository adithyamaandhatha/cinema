import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from './movie.model';
import { Observable,map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl: string = "https://glorious-fishstick-jgw97jqj6r92gpp-3000.app.github.dev/movies";

  constructor(private http: HttpClient) { }

  getAllMovies(): Observable<any>{
    return this.http.get(this.apiUrl);
  }

  getById(id: any): Observable<any>{
    return this.http.get(`${this.apiUrl}/${id}`).pipe(map((data)=>
    {
      if(Array.isArray(data)){
        return data;
      }
      else{
        return [data];
      }
    }));
  }

  addMovie(movie: Movie): Observable<any>{
    return this.http.post(this.apiUrl,movie);
  }

  deleteMovie(id: any): Observable<any>{
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateMovie(movie: Movie,id: any): Observable<any>{
    return this.http.put(`${this.apiUrl}/${id}`,movie);
  }
}
