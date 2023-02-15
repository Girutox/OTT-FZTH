import {Component, OnInit} from '@angular/core';
import {MovieApiService} from 'src/app/services/movie-api.service';
import {Trending, Movie, ResultTrending, ResultMovie} from "../../types";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private service: MovieApiService) {
  }

  bannerMoviesData: Trending[] = [];
  trendingMoviesData: Trending[] = [];
  actionMoviesData: Movie[] = [];
  comedyMoviesData: Movie[] = [];
  adventureMoviesData: Movie[] = [];

  ngOnInit(): void {
    this.bannerMovieDataRequest();
    this.trendingDataRequest();
    this.actionDataRequest();
    this.adventureDataRequest();
    this.comedyDataRequest();
  }

  bannerMovieDataRequest() {
    this.service.bannerApiData().subscribe((result: ResultTrending) => {
      this.bannerMoviesData = result.results;
    })
  }


  trendingDataRequest() {
    this.service.trendingMovieApiData().subscribe((response: ResultTrending) => {
      this.trendingMoviesData = response.results;
    })
  }

  actionDataRequest() {
    this.service.trendingMovieApiData().subscribe((response: ResultTrending) => {
      this.actionMoviesData = response.results;
    })
  }

  comedyDataRequest() {
    this.service.fetchComedyMovies().subscribe((result: ResultMovie) => {
      this.comedyMoviesData = result.results;
    })
  }

  adventureDataRequest() {
    this.service.fetchAdventureMovies().subscribe((result: ResultMovie) => {
      this.adventureMoviesData = result.results;
    })
  }
}
