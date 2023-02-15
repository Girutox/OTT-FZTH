import {Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MovieApiService} from 'src/app/services/movie-api.service';
import {ResultSearch, Search} from "../../types";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  constructor(private service: MovieApiService) {
  }

  searchResult: Search[] = [];

  searchForm = new FormGroup({
    'movieName': new FormControl(null)
  });

  submitForm() {
    this.service.getSearchMovie({
      movie_name: this.searchForm.controls.movieName.value ?? ""
    }).subscribe((result: ResultSearch) => {
      this.searchResult = result.results;
    });
  }
}
