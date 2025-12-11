import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart, faHeartBroken, faStar, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { MovieService } from '../../services/movie.service';
import { WishListService } from '../../services/wish-list.service';
import { PaginationService } from '../../services/pagination.service';
import { Movie } from '../../models/movie.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FontAwesomeModule, SearchBarComponent],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit, OnDestroy {
  faHeart = faHeart;
  faHeartBroken = faHeartBroken;
  faStar = faStar;
  faSpinner = faSpinner;

  movies: Movie[] = [];
  wishList: number[] = [];
  isLoading = false;
  error: string | null = null;
  currentPage = 1;
  totalPages = 1;
  isSearching = false;
  searchQuery = '';

  private movieService = inject(MovieService);
  private wishListService = inject(WishListService);
  private paginationService = inject(PaginationService);
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    // Restore pagination state
    const savedState = this.paginationService.getPaginationState();
    this.currentPage = savedState.currentPage;
    this.searchQuery = savedState.searchQuery;
    this.isSearching = savedState.isSearching;

    // Load movies based on restored state
    if (this.isSearching && this.searchQuery) {
      this.loadSearchResults();
    } else {
      this.loadMovies();
    }

    this.wishListService.wishList$
      .pipe(takeUntil(this.destroy$))
      .subscribe(wishList => {
        this.wishList = wishList.map(m => m.id);
      });
  }

  loadMovies(): void {
    this.isLoading = true;
    this.error = null;
    this.isSearching = false;

    this.movieService.getMovieList(this.currentPage)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.movies = response.results;
          this.totalPages = response.total_pages;
          this.isLoading = false;
        },
        error: (err) => {
          this.error = 'Failed to load movies. Please check your API key.';
          this.isLoading = false;
          console.error(err);
        }
      });
  }

  onSearch(query: string): void {
    this.searchQuery = query;
    this.currentPage = 1;
    this.isSearching = true;
    this.paginationService.setSearchState(query, true);
    this.loadSearchResults();
  }

  private loadSearchResults(): void {
    this.isLoading = true;
    this.error = null;

    this.movieService.getMovieByTitle(this.searchQuery, this.currentPage)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.movies = response.results;
          this.totalPages = response.total_pages;
          this.isLoading = false;
        },
        error: (err) => {
          this.error = 'Failed to search movies.';
          this.isLoading = false;
          console.error(err);
        }
      });
  }

  onClear(): void {
    this.searchQuery = '';
    this.currentPage = 1;
    this.loadMovies();
  }

  isInWishList(movieId: number): boolean {
    return this.wishList.includes(movieId);
  }

  toggleWishList(movie: Movie, event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    if (this.isInWishList(movie.id)) {
      this.wishListService.removeFromWishList(movie.id);
    } else {
      this.wishListService.addToWishList(movie);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginationService.setCurrentPage(this.currentPage);
      if (this.isSearching) {
        this.loadSearchResults();
      } else {
        this.loadMovies();
      }
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginationService.setCurrentPage(this.currentPage);
      if (this.isSearching) {
        this.loadSearchResults();
      } else {
        this.loadMovies();
      }
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
