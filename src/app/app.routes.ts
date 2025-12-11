import { Routes } from '@angular/router';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { WishListComponent } from './components/wish-list/wish-list.component';

export const routes: Routes = [
  {
    path: '',
    component: MovieListComponent
  },
  {
    path: 'movie/:id',
    component: MovieDetailComponent
  },
  {
    path: 'wish-list',
    component: WishListComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
