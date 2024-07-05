import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

const headers = new HttpHeaders({
  accept: 'application/json',
  Authorization:
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNzg4NTE5MDQ4MjZmYjljNjZhMzlkYmNkOTAxNDMyNiIsIm5iZiI6MTcxOTc1Mzg5Ni41NDk0NTksInN1YiI6IjY2ODE1OTc3YmQyYWY1N2QyZGZmMTMxZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A-gRMtBP-xvOfZBHeMjZl3tRB7jKKxGyuEkmby7N-9k',
});

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  [x: string]: any;
  private apiUrl = 'https://api.themoviedb.org/3';
  http = inject(HttpClient);

  getMovies() {
    const params = new HttpParams()
      .set('include_adult', 'false')
      .set('include_video', 'false')
      .set('language', 'en-US')
      .set('page', '1')
      .set('sort_by', 'popularity.desc');

    return this.http.get<any>(`${this.apiUrl}/discover/movie`, { headers, params });
  }

  searchMovies(query: string) {
    const params = new HttpParams()
      .set('query', query)
      .set('language', 'en-US')
      .set('page', '1')
      .set('include_adult', 'false');

    return this.http.get<any>(`${this.apiUrl}/search/movie`, { headers, params });
  }

  getlistPopularMovies(page: number = 1) {
    const params = new HttpParams()
      .set('include_adult', 'false')
      .set('include_video', 'false')
      .set('language', 'en-US')
      .set('page', page.toString())
      .set('sort_by', 'popularity.desc');

    return this.http.get<any>('https://api.themoviedb.org/3/movie/popular', {
      headers,
      params,
    });
  }

  getMoviesByGenre(genreId: number) {
    const params = new HttpParams()
      .set('include_adult', 'false')
      .set('include_video', 'false')
      .set('language', 'en-US')
      .set('page', '1')
      .set('sort_by', 'popularity.desc')
      .set('with_genres', genreId.toString());

    return this.http.get<any>('https://api.themoviedb.org/3/discover/movie', {
      headers,
      params,
    });
  }

  getMovieDetails(movieId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/movie/${movieId}`, { headers });
  }

  getTvShows() {
    return this.http.get<any>('https://api.themoviedb.org/3/discover/tv', {
      headers,
    });
  }

  getRatedMovies() {
    return this.http.get<any>(
      'https://api.themoviedb.org/3/guest_session/guest_session_id/rated/movies',
      { headers }
    );
  }

  getBannerImage(id: number) {
    return this.http.get<any>(
      `https://api.themoviedb.org/3/movie/${id}/images`,
      { headers }
    );
  }

  getBannerVideo(id: number) {
    return this.http.get<any>(
      `https://api.themoviedb.org/3/movie/${id}/videos`,
      { headers }
    );
  }

  getBannerDetail(id: number) {
    return this.http.get<any>(`https://api.themoviedb.org/3/movie/${id}`, {
      headers,
    });
  }

  getNowPlayingMovies() {
    return this.http.get<any>(
      'https://api.themoviedb.org/3/movie/now_playing',
      { headers }
    );
  }
 
  getPopularMovies() {
    return this.http.get<any>('https://api.themoviedb.org/3/movie/popular', {
      headers,
    });
  }

  getTopRated() {
    return this.http.get<any>('https://api.themoviedb.org/3/movie/top_rated', {
      headers,
    });
  }

  getUpcomingMovies() {
    return this.http.get<any>('https://api.themoviedb.org/3/movie/upcoming', {
      headers,
    });
  }
}