import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { HeaderComponent } from '../../core/components/header/header.component';
import { BannerComponent } from '../../core/components/banner/banner.component';
import { MovieService } from '../../shared/services/movie.service';
import { CommonModule } from '@angular/common';
import { MovieCarouselComponent } from '../../shared/components/movie-carousel/movie-carousel.component';
import { IVideoContent } from '../../shared/models/video-content.interface';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { FooterComponent } from '../../core/components/footer/footer.component';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    BannerComponent,
    MovieCarouselComponent,
    FooterComponent,
  ],
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css'],
})
export class BrowseComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private movieService: MovieService
  ) {}

  name!: string;
  userProfileImg!: string;
  email!: string;

  bannerDetail$!: Observable<any>;
  bannerVideoKey$!: Observable<string>;

  movies: IVideoContent[] = [];
  tvShows: IVideoContent[] = [];
  ratedMovies: IVideoContent[] = [];
  nowPlayingMovies: IVideoContent[] = [];
  popularMovies: IVideoContent[] = [];
  topRatedMovies: IVideoContent[] = [];
  upcomingMovies: IVideoContent[] = [];

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      const user = JSON.parse(sessionStorage.getItem('loggedInUser')!);
      if (user) {
        this.name = user.name;
        this.userProfileImg = user.picture;
        this.email = user.email;
      }
    }
    
    this.movieService.getMovies().pipe(
      switchMap((res: any) => {
        console.log('Movies:', res.results);
        this.movies = res.results;
        if (this.movies.length > 0) {
          const firstMovieId = this.movies[0].id;
          this.bannerDetail$ = this.movieService.getBannerDetail(firstMovieId);
          this.bannerVideoKey$ = this.movieService.getBannerVideo(firstMovieId).pipe(
            map((videoRes: any) => videoRes.results[0]?.key || ''),
            catchError(() => of(''))
          );
          return of(null);
        }
        return of(null);
      }),
      catchError((error) => {
        console.error('Error fetching movies:', error);
        return of(null);
      })
    ).subscribe();

    this.movieService.getTvShows().subscribe(
      (res: any) => {
        this.tvShows = res.results;
      },
      (error: any) => {
        console.error('Error fetching TV shows:', error);
      }
    );

    this.movieService.getRatedMovies().subscribe(
      (res: any) => {
        this.ratedMovies = res.results;
      },
      (error: any) => {
        console.error('Error fetching rated movies:', error);
      }
    );

    this.movieService.getNowPlayingMovies().subscribe(
      (res: any) => {
        this.nowPlayingMovies = res.results;
      },
      (error: any) => {
        console.error('Error fetching now playing movies:', error);
      }
    );

    this.movieService.getPopularMovies().subscribe(
      (res: any) => {
        this.popularMovies = res.results;
      },
      (error: any) => {
        console.error('Error fetching popular movies:', error);
      }
    );

    this.movieService.getTopRated().subscribe(
      (res: any) => {
        this.topRatedMovies = res.results;
      },
      (error: any) => {
        console.error('Error fetching top rated movies:', error);
      }
    );

    this.movieService.getUpcomingMovies().subscribe(
      (res: any) => {
        this.upcomingMovies = res.results;
      },
      (error: any) => {
        console.error('Error fetching upcoming movies:', error);
      }
    );
  }

  signOut(): void {
    sessionStorage.removeItem('loggedInUser');
    this.authService.signOut();
  }
}