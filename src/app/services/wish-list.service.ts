import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class WishListService {
  private wishListSubject = new BehaviorSubject<Movie[]>(this.loadWishList());
  public wishList$ = this.wishListSubject.asObservable();

  constructor() {}

  /**
   * Load wish list from localStorage
   */
  private loadWishList(): Movie[] {
    const stored = localStorage.getItem('movieWishList');
    return stored ? JSON.parse(stored) : [];
  }

  /**
   * Save wish list to localStorage
   */
  private saveWishList(wishList: Movie[]): void {
    localStorage.setItem('movieWishList', JSON.stringify(wishList));
  }

  /**
   * Add movie to wish list
   */
  addToWishList(movie: Movie): void {
    const currentWishList = this.wishListSubject.value;
    if (!currentWishList.some(m => m.id === movie.id)) {
      const updatedWishList = [...currentWishList, movie];
      this.saveWishList(updatedWishList);
      this.wishListSubject.next(updatedWishList);
    }
  }

  /**
   * Remove movie from wish list
   */
  removeFromWishList(movieId: number): void {
    const currentWishList = this.wishListSubject.value;
    const updatedWishList = currentWishList.filter(m => m.id !== movieId);
    this.saveWishList(updatedWishList);
    this.wishListSubject.next(updatedWishList);
  }

  /**
   * Clear entire wish list
   */
  clearWishList(): void {
    this.saveWishList([]);
    this.wishListSubject.next([]);
  }

  /**
   * Get current wish list
   */
  getWishList(): Movie[] {
    return this.wishListSubject.value;
  }

  /**
   * Check if movie is in wish list
   */
  isInWishList(movieId: number): boolean {
    return this.wishListSubject.value.some(m => m.id === movieId);
  }
}
