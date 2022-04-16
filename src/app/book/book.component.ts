import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  type = "";
  id = "";
  url = "";
  books: any;
  book: any;

  constructor(private rout: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.type = this.rout.snapshot.params['type'];
    this.id = this.rout.snapshot.params['id'];
    if (this.type === 'trending') {
      this.url = 'http://localhost:4200/assets/data/trending-movies.json';
    }
    if (this.type === 'theatre') {
      this.url = 'http://localhost:4200/assets/data/theatre-movies.json';
    }
    if (this.type === 'popular') {
      this.url = 'http://localhost:4200/assets/data/popular-movies.json';
    }
    this.getBook();
  }

  getBook(){
    this.http.get(this.url).subscribe((books) => {
      this.books = books;
      let index = this.books.findIndex(
        (book: { id: string }) => book.id == this.id
      );
      if (index > -1) {
        this.book = this.books[index];
      }
    });
  }
}
