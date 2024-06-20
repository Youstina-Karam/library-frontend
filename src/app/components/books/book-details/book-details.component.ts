import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {
  book: any;
  bookId:any
 constructor(private booksService: BooksService,
  private route: ActivatedRoute,
  private router: Router
 ){}

 ngOnInit(): void {
   this.bookId = this.route.snapshot.paramMap.get('id');
    this.booksService.getBookById(this.bookId).subscribe(data => {
    this.book = data;
  });
 }

 deleteBook(): void {
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
      this.booksService.deleteBook(this.bookId).subscribe(() => {
        Swal.fire({
          title: "Deleted!",
          text: "This book is deleted",
          icon: "success"
        });
        this.router.navigate(['/books']);
      });
     
    }
  });
}
}
