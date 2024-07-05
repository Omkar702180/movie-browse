import { Component, Input, OnInit, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { IVideoContent } from '../../models/video-content.interface';
import { DescriptionPipe } from '../../pipes/description.pipe';
import { ImagePipe } from '../../pipes/image.pipe';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../services/movie.service';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-movies-list',
  standalone: true,
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css'],
  imports: [ImagePipe, DescriptionPipe, CommonModule]
})
export class MoviesListComponent implements OnInit, AfterViewInit {
  @Input() videoContent: IVideoContent[] = [];
  @Input() title!: string;
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;

  selectedContent: string | null = null;
  isMobileView: boolean = false;
  genres: { id: number, name: string }[] = [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentary' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Family' },
    { id: 14, name: 'Fantasy' },
    { id: 36, name: 'History' },
    { id: 27, name: 'Horror' },
    { id: 10402, name: 'Music' },
    { id: 9648, name: 'Mystery' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Science Fiction' },
    { id: 10770, name: 'TV Movie' },
    { id: 53, name: 'Thriller' },
    { id: 10752, name: 'War' },
    { id: 37, name: 'Western' }
  ];

  constructor(private movieService: MovieService, private router: Router) {} // Inject Router

  ngAfterViewInit(): void {
    this.checkView(); 
  }

  ngOnInit(): void {
    this.fetchPopularMovies(); // Fetch popular movies on initialization
  }

  @HostListener('window:resize')
  checkView() {
    this.isMobileView = window.innerWidth <= 599;
  }

  onSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    const searchTerm = target.value.trim();
    if (searchTerm) {
      this.fetchSearchResults(searchTerm);
    } else {
      this.fetchPopularMovies(); // Fetch popular movies if search term is empty
    }
  }

  onGenreChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const genreId = target.value;
    if (genreId) {
      this.fetchMoviesByGenre(parseInt(genreId, 10));
    } else {
      this.fetchPopularMovies(); // Fetch popular movies if no genre is selected
    }
  }

  fetchSearchResults(searchTerm: string) {
    this.movieService.searchMovies(searchTerm).subscribe((response) => {
      this.videoContent = response.results;
    });
  }

  fetchPopularMovies() {
    this.movieService.getlistPopularMovies().subscribe((response) => {
      this.videoContent = response.results;
    });
  }

  fetchMoviesByGenre(genreId: number) {
    this.movieService.getMoviesByGenre(genreId).subscribe((response) => {
      this.videoContent = response.results;
    });
  }

  preventSubmit(event: Event) {
    event.preventDefault();
  }

  preventEnter(event: Event) {
    const keyboardEvent = event as KeyboardEvent;
    if (keyboardEvent.key === 'Enter') {
      keyboardEvent.preventDefault();
    }
  }

  saveToLocalStorage(movie: any) {
    let storedMovies = JSON.parse(localStorage.getItem('savedMovies') || '[]');
    const movieExists = storedMovies.find((m: any) => m.id === movie.id);
  
    if (!movieExists) {
      storedMovies.push(movie);
      localStorage.setItem('savedMovies', JSON.stringify(storedMovies));
      console.log('Movie saved to localStorage:', movie);
      this.router.navigate(['/my_list']); // Navigate to my-list after saving
    } else {
      console.log('Movie already exists in localStorage:', movie);
      this.router.navigate(['/my_list']); // Navigate to my-list even if the movie already exists
    }
  }  

  navigateToDetail(movieId: number): void {
    this.router.navigate(['/detail', movieId]);
  }
}