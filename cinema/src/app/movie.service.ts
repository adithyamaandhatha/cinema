import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from './movie.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl: string = "https://obscure-winner-p6q9wjp7jjvcr6xj-3000.app.github.dev/movies";

  constructor(private http: HttpClient) { }

  getAllMovies(): Observable<any>{
    return this.http.get(this.apiUrl);
  }

  getById(id: any): Observable<any>{
    return this.http.get(`${this.apiUrl}/${id}`);
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
