import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorsListComponent } from './components/authors/authors-list/authors-list.component';
import { BooksListComponent } from './components/books/books-list/books-list.component';
import { BookDetailsComponent } from './components/books/book-details/book-details.component';
import { AuthorDetailsComponent } from './components/authors/author-details/author-details.component';
import { BookFormComponent } from './components/books/book-form/book-form.component';
import { AuthorFormComponent } from './components/authors/author-form/author-form.component';

const routes: Routes = [
  { path: 'books', component: BooksListComponent },
  { path: 'book-details/:id', component: BookDetailsComponent },
  { path: 'edit-book/:id', component: BookFormComponent},
  { path: 'add-book', component: BookFormComponent },
  { path: 'authors', component: AuthorsListComponent },
  { path: 'author-details/:id', component: AuthorDetailsComponent },
  { path: 'add-author', component: AuthorFormComponent },
  { path: 'edit-author/:id', component: AuthorFormComponent },

  { path: '', redirectTo: '/books', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
