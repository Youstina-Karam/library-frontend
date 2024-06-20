import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorsService } from 'src/app/services/authors.service';
import { BooksService } from 'src/app/services/books.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-author-form',
  templateUrl: './author-form.component.html',
  styleUrls: ['./author-form.component.scss']
})
export class AuthorFormComponent implements OnInit {
  author: any = {
    name: '',
    bio: '',
    birthDate: new Date(),
    books: []
  };
  isEditMode: boolean = false;
  authorId: any;
  books: any[] = [];

  constructor(private authorsService: AuthorsService,
    private booksService: BooksService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.authorId = this.route.snapshot.paramMap.get('id');
    if (this.authorId) {
      this.isEditMode = true;
      this.authorsService.getAuthorById(this.authorId).subscribe(data => {
        this.author = data;
        this.booksService.getBooks(1, 1000).subscribe(data => {
          this.books = data.books;
          this.author.books = this.author.books.map((book: any) => book._id);
        });
      });
    }
    this.booksService.getBooks(1, 1000).subscribe(data => {
      this.books = data.books;
    });
  }

  saveAuthor(): void {
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
          this.authorsService.updateAuthor(this.authorId, this.author).subscribe(() => {
            Swal.fire("Saved!", "", "success");
            this.router.navigate(['/author-details/' + this.authorId]);
          });
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });


    } else {
      this.authorsService.createAuthor(this.author).subscribe(() => {
        Swal.fire("Created!", "", "success");
        this.router.navigate(['/authors']);
      });
    }
  }
}
