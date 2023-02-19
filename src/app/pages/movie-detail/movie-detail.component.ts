import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieApiService } from "../../services/movie-api.service";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { Genre, MovieDetail, ResultCast, ResultVideo } from "../../types";
import { VgApiService } from '@videogular/ngx-videogular/core';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit, OnDestroy {
  movieId: number = 0;
  routeParams: Subscription | undefined;
  movieDetails: MovieDetail | undefined;
  movieCast: ResultCast | undefined;
  movieVideos: ResultVideo | undefined;

  api: VgApiService | undefined;

  constructor(private service: MovieApiService,
    private route: ActivatedRoute) {
  }

  async ngOnInit(): Promise<void> {
    this.routeParams = this.route.params.subscribe(params => {
      this.movieId = +params['id'];
    });

    await this.getMovieDetail(this.movieId);
    await this.getMovieCast(this.movieId);
    await this.getMovieVideos(this.movieId);
  }

  async getMovieDetail(movie_id: number): Promise<void> {
    const response: MovieDetail | void = await this.service.getMovieDetails({
      movie_id
    }).toPromise().catch((error) => {
      // THROW ERROR
    });

    if (response) {
      this.movieDetails = response;
    }
  }

  async getMovieCast(movie_id: number): Promise<void> {
    const response: ResultCast | void = await this.service.getMovieCast({
      movie_id
    }).toPromise().catch((error) => {
      // THROW ERROR
    });

    if (response) {
      this.movieCast = response;
    }
  }
  async getMovieVideos(movie_id: number): Promise<void> {
    const response: ResultVideo | void = await this.service.getMovieVideos({
      movie_id
    }).toPromise().catch((error) => {
      // THROW ERROR
    });

    if (response) {
      this.movieVideos = response;
    }
  }

  getReleaseDateYearString(releaseDate: string): string {
    return releaseDate.substring(0, 4);
  }

  getOriginalLanguageUpperCase(originalLanguage: string): string {
    return originalLanguage.toUpperCase()
  }

  getCastStringOneLineTop5(): string {
    let oneLineString = "";
    let index = 0;

    for (const item of this.movieCast?.cast ?? []) {
      index++;
      oneLineString += `${item.name}, `;
      if (index === 5) break;
    }

    if (oneLineString.length > 0) {
      oneLineString = oneLineString.substring(0, oneLineString.length - 2);
    }

    return oneLineString;
  }

  getGenresStringOneLine(genres: Genre[]): string {
    let oneLineString = "";

    for (const item of genres) {
      oneLineString += `${item.name}, `;
    }

    if (oneLineString.length > 0) {
      oneLineString = oneLineString.substring(0, oneLineString.length - 2);
    }

    return oneLineString;
  }

  getPublishedDateString(publishedAt: string) {
    return new Date(publishedAt).toLocaleDateString();
  }

  onPlayerSet(api: VgApiService): void {
    this.api = api
  }

  movieMouseEnterHandler(): void {
    const preview = document.getElementById("previewPlayer");
    const real = document.getElementById("realContent");

    if (real && preview) {
      real.style.display = "none";

      preview.style.display = "block";
      preview.classList.add("fadeInCustom");

      if (this.api) {
        this.api.play();
      }
    }
  }

  movieMouseLeaveHandler(): void {
    const preview = document.getElementById("previewPlayer");
    const real = document.getElementById("realContent");

    if (real && preview) {
      real.style.display = "block";

      preview.style.display = "none";
      preview.classList.remove("fadeInCustom");

      if (this.api) {
        this.api.getDefaultMedia().currentTime = 0;
        this.api.pause();
      }
    }
  }

  ngOnDestroy(): void {
    if (this.routeParams) this.routeParams.unsubscribe();
  }
}
