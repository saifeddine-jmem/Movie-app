import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faHeart, faHeartBroken, faStar, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { MovieService } from '../../services/movie.service';
import { WishListService } from '../../services/wish-list.service';
import { MovieDetail } from '../../models/movie.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, FontAwesomeModule],
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit, OnDestroy {
  faArrowLeft = faArrowLeft;
  faHeart = faHeart;
  faHeartBroken = faHeartBroken;
  faStar = faStar;
  faSpinner = faSpinner;

  movie: MovieDetail | null = null;
  isLoading = false;
  error: string | null = null;
  isInWishList = false;

  private movieService = inject(MovieService);
  private wishListService = inject(WishListService);
  private route = inject(ActivatedRoute);
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        const id = params.get('id');
        if (id) {
          this.loadMovieDetail(Number(id));
        }
      });

    this.wishListService.wishList$
      .pipe(takeUntil(this.destroy$))
      .subscribe(wishList => {
        if (this.movie) {
          this.isInWishList = wishList.some(m => m.id === this.movie!.id);
        }
      });
  }

  loadMovieDetail(id: number): void {
    this.isLoading = true;
    this.error = null;

    this.movieService.getMovieById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (movie) => {
          this.movie = movie;
          this.isLoading = false;
          // Check if in wish list after loading
          this.wishListService.wishList$.pipe(takeUntil(this.destroy$)).subscribe(wishList => {
            this.isInWishList = wishList.some(m => m.id === movie.id);
          });
        },
        error: (err) => {
          this.error = 'Failed to load movie details.';
          this.isLoading = false;
          console.error(err);
        }
      });
  }

  toggleWishList(): void {
    if (!this.movie) return;

    if (this.isInWishList) {
      this.wishListService.removeFromWishList(this.movie.id);
    } else {
      this.wishListService.addToWishList(this.movie);
    }
  }

  getBackdropUrl(): string {
    if (!this.movie) return '';
    return this.movieService.getBackdropUrl(this.movie.backdrop_path);
  }

  getPosterUrl(): string {
    if (!this.movie) return '';
    return this.movieService.getPosterUrl(this.movie.poster_path);
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
