import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit  {
  book: any = {
    title: '',
    content: '',
    author: '',
    publishedDate: new Date()
  };
  isEditMode: boolean = false;
  bookId: any;

  constructor(
    private booksService: BooksService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.bookId = this.route.snapshot.paramMap.get('id');
    if (this.bookId) {
      this.isEditMode = true;
      this.booksService.getBookById(this.bookId).subscribe(data => {
        this.book = data;
      });
    }
  }

  saveBook(): void {
    if (this.isEditMode) {
      Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.booksService.updateBook(this.bookId, this.book).subscribe(() => {
          Swal.fire("Saved!", "", "success");
            this.router.navigate(['/book-details/'+this.bookId]);
          });
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    } else {
      this.booksService.createBook(this.book).subscribe(() => {
        Swal.fire("Created!", "", "success");
        this.router.navigate(['/books']);
      });
    }
  }
  
}
