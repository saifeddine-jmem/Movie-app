import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Movie, MovieResponse, MovieDetail } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private http = inject(HttpClient);
  private apiKey = environment.tmdbApiKey;
  private baseUrl = environment.tmdbBaseUrl;
  private imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

  constructor() {}

  /**
   * Fetch currently playing movies from TMDB
   */
  getMovieList(page: number = 1): Observable<MovieResponse> {
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('page', page.toString());

    return this.http.get<MovieResponse>(
      `${this.baseUrl}/movie/now_playing`,
      { params }
    );
  }

  /**
   * Get detailed information for a specific movie by ID
   */
  getMovieById(id: number): Observable<MovieDetail> {
    const params = new HttpParams().set('api_key', this.apiKey);

    return this.http.get<MovieDetail>(
      `${this.baseUrl}/movie/${id}`,
      { params }
    );
  }

  /**
   * Search movies by title
   */
  getMovieByTitle(title: string, page: number = 1): Observable<MovieResponse> {
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('query', title)
      .set('page', page.toString());

    return this.http.get<MovieResponse>(
      `${this.baseUrl}/search/movie`,
      { params }
    );
  }

  /**
   * Get poster image URL
   */
  getPosterUrl(posterPath: string | null): string {
    if (!posterPath) {
      return 'assets/no-image.png';
    }
    return `${this.imageBaseUrl}${posterPath}`;
  }

  /**
   * Get backdrop image URL
   */
  getBackdropUrl(backdropPath: string | null): string {
    if (!backdropPath) {
      return 'assets/no-image.png';
    }
    return `${this.imageBaseUrl}${backdropPath}`;
  }
}
