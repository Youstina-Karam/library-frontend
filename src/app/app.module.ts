import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BooksListComponent } from './components/books/books-list/books-list.component';
import { BookDetailsComponent } from './components/books/book-details/book-details.component';
import { BookFormComponent } from './components/books/book-form/book-form.component';
import { AuthorDetailsComponent } from './components/authors/author-details/author-details.component';
import { AuthorsListComponent } from './components/authors/authors-list/authors-list.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthorFormComponent } from './components/authors/author-form/author-form.component';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    BooksListComponent,
    BookDetailsComponent,
    BookFormComponent,
    AuthorDetailsComponent,
    AuthorsListComponent,
    AuthorFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatSelectModule,
    BrowserAnimationsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
