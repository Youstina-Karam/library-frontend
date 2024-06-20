import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorsService } from 'src/app/services/authors.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.scss']
})
export class AuthorDetailsComponent implements OnInit{
  author: any;
  authorId: any;
  
  constructor(private authorsService: AuthorsService,
    private route: ActivatedRoute,
    private router: Router){}

  ngOnInit(): void {
    this.authorId = this.route.snapshot.paramMap.get('id');
    this.authorsService.getAuthorById(this.authorId).subscribe(data => {
    this.author = data;
  });
  }

  deleteAuthor(): void {
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
        this.authorsService.deleteAuthor(this.authorId).subscribe(() => {
          Swal.fire({
            title: "Deleted!",
            text: "This author is deleted",
            icon: "success"
          });
          this.router.navigate(['/authors']);
        });
       
      }
    });
  }
}
