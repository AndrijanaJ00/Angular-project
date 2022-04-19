import {HttpClient} from '@angular/common/http';
import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup} from "@angular/forms";

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
  reviewList: any[] = [];
  book: any;
  form = new FormGroup({
    author: new FormControl(""),
    rating: new FormControl(""),
    review: new FormControl(""),
    published_on: new FormControl("")
  });


  constructor(private rout: ActivatedRoute, private http: HttpClient) {
  }

  ngOnInit(): void {
    console.log(this.rout.snapshot.params['type'], "type");
    console.log(this.rout.snapshot.params, "id");

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

  getBook() {
    this.http.get(this.url).subscribe((books) => {
      console.log(books);
      this.books = books;
      let index = this.books.findIndex(
        (book: { id: string }) => book.id == this.id
      );
      if (index > -1) {
        this.book = this.books[index];
      }
    });

  }

  addReview() {
    this.form.value.published_on = new Date;
    this.form.value.rating = 4;
    this.reviewList = this.book.reviews;
    this.reviewList.push(this.form.value);
    this.book.reviews = this.reviewList;
    this.http.post(this.url, this.book).toPromise().then();
  }
}
