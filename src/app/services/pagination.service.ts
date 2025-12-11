import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface PaginationState {
  currentPage: number;
  searchQuery: string;
  isSearching: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  private paginationStateSubject = new BehaviorSubject<PaginationState>({
    currentPage: 1,
    searchQuery: '',
    isSearching: false
  });

  public paginationState$: Observable<PaginationState> = this.paginationStateSubject.asObservable();

  constructor() {}

  /**
   * Save current pagination state
   */
  savePaginationState(state: PaginationState): void {
    this.paginationStateSubject.next(state);
  }

  /**
   * Get current pagination state
   */
  getPaginationState(): PaginationState {
    return this.paginationStateSubject.value;
  }

  /**
   * Reset pagination state
   */
  resetPaginationState(): void {
    this.paginationStateSubject.next({
      currentPage: 1,
      searchQuery: '',
      isSearching: false
    });
  }

  /**
   * Update page number only
   */
  setCurrentPage(page: number): void {
    const currentState = this.paginationStateSubject.value;
    this.paginationStateSubject.next({
      ...currentState,
      currentPage: page
    });
  }

  /**
   * Update search state
   */
  setSearchState(query: string, isSearching: boolean): void {
    const currentState = this.paginationStateSubject.value;
    this.paginationStateSubject.next({
      ...currentState,
      searchQuery: query,
      isSearching: isSearching,
      currentPage: 1
    });
  }
}
