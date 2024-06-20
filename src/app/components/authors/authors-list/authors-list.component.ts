import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorsService } from 'src/app/services/authors.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-authors-list',
  templateUrl: './authors-list.component.html',
  styleUrls: ['./authors-list.component.scss']
})
export class AuthorsListComponent implements OnInit {
  authors: any[] = [];
  totalPages: number = 0;
  currentPage: number = 1;
  limit: number = 10;
  name: string = '';
  bio: string = '';

  constructor(private authorsService: AuthorsService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.getAuthors()

  }

  getAuthors(): void {
    this.authorsService.getAuthors(this.currentPage, this.limit, this.name, this.bio).subscribe(data => {
      this.authors = data.authors;
      this.totalPages = Number(data.totalPages);
      this.currentPage = Number(data.currentPage);
    });
  }

  searchByName(event:KeyboardEvent){
    this.currentPage = 1;
    const input = event.target as HTMLInputElement;
    this.name = input.value;
    this.getAuthors();
  }

  searchByBio(event:KeyboardEvent){
    this.currentPage = 1;
    const input = event.target as HTMLInputElement;
    this.bio = input.value;
    this.getAuthors();
  }

  changePage(page: number): void {
    if ((page > 0 || page < this.totalPages) && page !== 0) {
      this.currentPage = page;
      this.getAuthors();
    }
  }

  deleteAuthor(authorId: string): void {
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
        this.authorsService.deleteAuthor(authorId).subscribe(() => {
          this.getAuthors();
          Swal.fire({
            title: "Deleted!",
            text: "This author is deleted",
            icon: "success"
          });
        });
      }
    });
  }

  showAuthorDetails(id: string) {
    this.router.navigate(['/author-details/' + id]);
  }

}
