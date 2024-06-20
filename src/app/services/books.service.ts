import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private baseUrl = 'http://localhost:3000/books';

  constructor(private http: HttpClient) { }

  // Get all books with pagination and search
  getBooks(page: number, limit: number, title?: string, author?: string): Observable<any> {
    let params = new HttpParams().set('page', page.toString()).set('limit', limit.toString())
    if (title) params = params.set('title', title);
    if (author) params = params.set('author', author);

    return this.http.get(`${this.baseUrl}`, { params })
  }

  // Get book by Id
  getBookById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`)
  }

  //Create book
  createBook(book: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, book)
  }

  //Update book
  updateBook(id: string, book: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${id}`, book)
  }

  //Delete book
  deleteBook(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`)
  }
}
