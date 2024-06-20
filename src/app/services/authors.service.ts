import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';  

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {
  private baseUrl = 'http://localhost:3000/authors';

  constructor(private http: HttpClient) { }

  // Get all authors with pagination and search
  getAuthors(page: number, limit: number,name?: string, bio?: string): Observable<any> {
    let params = new HttpParams().set('page', page.toString()).set('limit', limit.toString())
    if (name) params = params.set('name', name);
    if (bio) params = params.set('bio', bio);

    return this.http.get(`${this.baseUrl}`, { params })
  }

  // Get authors by Id
  getAuthorById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`)
  }

  //Create authors
  createAuthor(author: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, author)
  }

  //Update authors
  updateAuthor(id: string, author: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${id}`, author)
  }

  //Delete authors
  deleteAuthor(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`)
  }
}
