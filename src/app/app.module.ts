import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SearchComponent} from './pages/search/search.component';
import {MovieDetailComponent} from './pages/movie-detail/movie-detail.component';
import {HomeComponent} from './pages/home/home.component';
import {MovieApiService} from './services/movie-api.service';
import {AuthService} from "./services/auth.service";
import {HttpClientModule} from '@angular/common/http';

import {ReactiveFormsModule} from '@angular/forms'
import {YouTubePlayerModule} from "@angular/youtube-player";
import {LoginComponent} from './pages/login/login.component';
import {ShellComponent} from './pages/shell/shell.component';

import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import {AngularFireStorageModule} from '@angular/fire/compat/storage';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';
import {AngularFireDatabaseModule} from '@angular/fire/compat/database';
import {environment} from '../environments/environment';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { PlanComponent } from './pages/plan/plan.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    MovieDetailComponent,
    SearchComponent,
    MovieDetailComponent,
    LoginComponent,
    ShellComponent,
    SignUpComponent,
    PlanComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    YouTubePlayerModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
  ],
  providers: [MovieApiService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
