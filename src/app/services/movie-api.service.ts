import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";
import {MovieDetail, Parameter, ResultCast, ResultMovie, ResultSearch, ResultTrending, ResultVideo} from "../types";

@Injectable({
  providedIn: 'root'
})
export class MovieApiService {

  constructor(private http: HttpClient) { }

  //bannerapidata
  bannerApiData(): Observable<ResultTrending>{
    return this.http.get<ResultTrending>(`${environment.theMovieDataBase.baseUrl}/trending/all/week?api_key=${environment.theMovieDataBase.apiKey}`);
  }

  // trendingmovieapidata
  trendingMovieApiData(): Observable<ResultTrending> {
    return this.http.get<ResultTrending>(`${environment.theMovieDataBase.baseUrl}/trending/movie/day?api_key=${environment.theMovieDataBase.apiKey}`);
  }

  // searchmovive
  getSearchMovie(data: Parameter): Observable<ResultSearch> {
    return this.http.get<ResultSearch>(`${environment.theMovieDataBase.baseUrl}/search/movie?api_key=${environment.theMovieDataBase.apiKey}&query=${data.movie_name}`);
  }

  // getmoviedatails
  getMovieDetails(data: Parameter): Observable<MovieDetail> {
    return this.http.get<MovieDetail>(`${environment.theMovieDataBase.baseUrl}/movie/${data.movie_id}?api_key=${environment.theMovieDataBase.apiKey}`)
  }

  // getMovieVideos
  getMovieVideos(data: Parameter): Observable<ResultVideo> {
    return this.http.get<ResultVideo>(`${environment.theMovieDataBase.baseUrl}/movie/${data.movie_id}/videos?api_key=${environment.theMovieDataBase.apiKey}`)
  }

  // getMovieCast
  getMovieCast(data: Parameter): Observable<ResultCast> {
    return this.http.get<ResultCast>(`${environment.theMovieDataBase.baseUrl}/movie/${data.movie_id}/credits?api_key=${environment.theMovieDataBase.apiKey}`)
  }

  // action
  fetchActionMovies(): Observable<ResultMovie> {
    return this.http.get<ResultMovie>(`${environment.theMovieDataBase.baseUrl}/discover/movie?api_key=${environment.theMovieDataBase.apiKey}&with_genres=28`);
  }

  // adventure
  fetchAdventureMovies(): Observable<ResultMovie> {
    return this.http.get<ResultMovie>(`${environment.theMovieDataBase.baseUrl}/discover/movie?api_key=${environment.theMovieDataBase.apiKey}&with_genres=12`);
  }

  // animation
  fetchAnimationMovies(): Observable<ResultMovie> {
    return this.http.get<ResultMovie>(`${environment.theMovieDataBase.baseUrl}/discover/movie?api_key=${environment.theMovieDataBase.apiKey}&with_genres=16`);
  }

  // comedy
  fetchComedyMovies(): Observable<ResultMovie> {
    return this.http.get<ResultMovie>(`${environment.theMovieDataBase.baseUrl}/discover/movie?api_key=${environment.theMovieDataBase.apiKey}&with_genres=35`);
  }

  // documentary
  fetchDocumentaryMovies(): Observable<ResultMovie> {
    return this.http.get<ResultMovie>(`${environment.theMovieDataBase.baseUrl}/discover/movie?api_key=${environment.theMovieDataBase.apiKey}&with_genres=99`);
  }

  // science-fiction:878
  fetchScienceFictionMovies(): Observable<ResultMovie> {
    return this.http.get<ResultMovie>(`${environment.theMovieDataBase.baseUrl}/discover/movie?api_key=${environment.theMovieDataBase.apiKey}&with_genres=878`);
  }

  // thriller:53
  fetchThrillerMovies(): Observable<ResultMovie> {
    return this.http.get<ResultMovie>(`${environment.theMovieDataBase.baseUrl}/discover/movie?api_key=${environment.theMovieDataBase.apiKey}&with_genres=53`);
  }
}
