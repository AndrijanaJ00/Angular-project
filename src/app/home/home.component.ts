import { Component, OnInit } from '@angular/core';
import{ HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  trendingBooks: any;
  popularNow: any;
  popularBooks: any;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.getTrendingBooks();
    this.getPopular2022();
    this.getPopularBooks();
  }

  getTrendingBooks(){
      this.http.get('http://localhost:4200/assets/data/trending-movies.json')
      .subscribe((books) => {
        this.trendingBooks = books;
        console.log(this.trendingBooks)
      });
  }

  getPopular2022() {
    this.http
      .get('http://localhost:4200/assets/data/theatre-movies.json')
      .subscribe((books) => {
        this.popularNow = books;
      });
  }

  getPopularBooks() {
    this.http
      .get('http://localhost:4200/assets/data/popular-movies.json')
      .subscribe((books) => {
        this.popularBooks = books;
      });
  }

  goToBook(type: string, id: string) {
    this.router.navigate(['book', type, id]);
  }


}
