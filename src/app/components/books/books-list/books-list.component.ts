import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit {
  books: any[] = [];
  totalPages: number = 0;
  currentPage: number = 1;
  limit: number = 10;
  title: string = '';
  author: string = '';

  constructor(private booksService: BooksService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.getBooks()
  }

  getBooks(): void {
    this.booksService.getBooks(this.currentPage, this.limit, this.title, this.author).subscribe(data => {
      this.books = data.books;
      this.totalPages = Number(data.totalPages);
      this.currentPage = Number(data.currentPage);
    });
  }

  searchByTitle(event:KeyboardEvent){
    this.currentPage = 1;
    const input = event.target as HTMLInputElement;
    this.title = input.value;
    this.getBooks();
  }

  searchByAuthor(event:KeyboardEvent){
    this.currentPage = 1;
    const input = event.target as HTMLInputElement;
    this.author = input.value;
    this.getBooks();
  }


  changePage(page: number): void {
    if ((page > 0 || page < this.totalPages) && page !== 0) {
      this.currentPage = page;
      this.getBooks();
    }
  }

  deleteBook(bookId: string): void {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.booksService.deleteBook(bookId).subscribe(() => {
          this.getBooks();
          Swal.fire({
            title: "Deleted!",
            text: "This book is deleted",
            icon: "success"
          });
        });
      }
    });

  }

  showBookDetails(id: string) {
    this.router.navigate(['/book-details/' + id]);
  }
}
