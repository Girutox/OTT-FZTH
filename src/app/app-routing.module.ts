import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {MovieDetailComponent} from './pages/movie-detail/movie-detail.component';
import {SearchComponent} from './pages/search/search.component';
import {LoginComponent} from "./pages/login/login.component";
import {ShellComponent} from "./pages/shell/shell.component";
import {AuthGuard} from "../shared/auth.guard";
import {SignUpComponent} from "./pages/sign-up/sign-up.component";
import {PlanComponent} from "./pages/plan/plan.component";

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignUpComponent,
  },
  {
    path: 'landing',
    component: ShellComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'plan',
        component: PlanComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'search',
        component: SearchComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'movie/:id',
        component: MovieDetailComponent,
        canActivate: [AuthGuard]
      }
    ]
  }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
