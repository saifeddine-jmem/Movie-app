import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faTrash, faStar } from '@fortawesome/free-solid-svg-icons';
import { WishListService } from '../../services/wish-list.service';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FontAwesomeModule],
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit, OnDestroy {
  faArrowLeft = faArrowLeft;
  faTrash = faTrash;
  faStar = faStar;

  wishList: Movie[] = [];
  isEmpty = false;

  private wishListService = inject(WishListService);
  private movieService = inject(MovieService);
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.wishListService.wishList$
      .pipe(takeUntil(this.destroy$))
      .subscribe(wishList => {
        this.wishList = wishList;
        this.isEmpty = wishList.length === 0;
      });
  }

  removeFromWishList(movieId: number, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.wishListService.removeFromWishList(movieId);
  }

  clearWishList(): void {
    if (confirm('Are you sure you want to clear your entire wish list?')) {
      this.wishListService.clearWishList();
    }
  }

  getPosterUrl(posterPath: string | null): string {
    return this.movieService.getPosterUrl(posterPath);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
