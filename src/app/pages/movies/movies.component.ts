import { Component, OnInit, HostListener } from '@angular/core';
import { HeaderComponent } from '../../core/components/header/header.component';
import { MovieService } from '../../shared/services/movie.service';
import { CommonModule } from '@angular/common';
import { IVideoContent } from '../../shared/models/video-content.interface';
import { FooterComponent } from '../../core/components/footer/footer.component';
import { MoviesListComponent } from '../../shared/components/movies-list/movies-list.component';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    MoviesListComponent,
    FooterComponent,
  ],
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  constructor(
    private movieService: MovieService
  ) {}

  name!: string;
  userProfileImg!: string;
  email!: string;

  popularMovies: IVideoContent[] = [];
  filteredMovies: IVideoContent[] = [];
  currentPage: number = 1;
  isLoading: boolean = false;

  ngOnInit(): void {
    const user = JSON.parse(sessionStorage.getItem('loggedInUser')!);
    if (user) {
      this.name = user.name;
      this.userProfileImg = user.picture;
      this.email = user.email;
    }
  
    this.loadMovies();
  }

  loadMovies() {
    if (this.isLoading) return;
    this.isLoading = true;

    this.movieService.getlistPopularMovies(this.currentPage).subscribe(
      (res: any) => {
        this.popularMovies = [...this.popularMovies, ...res.results];
        this.filteredMovies = [...this.popularMovies];
        this.currentPage++;
        this.isLoading = false;
      },
      (error: any) => {
        console.error('Error fetching popular movies:', error);
        this.isLoading = false;
      }
    );
  }

  filterMovies(query: string) {
    if (query) {
      this.filteredMovies = this.popularMovies.filter(movie =>
        movie.original_title.toLowerCase().includes(query.toLowerCase())
      );
    } else {
      this.filteredMovies = [...this.popularMovies];
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500 && !this.isLoading) {
      this.loadMovies();
    }
  }
}