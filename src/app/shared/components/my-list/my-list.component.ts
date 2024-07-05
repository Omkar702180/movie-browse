import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ImagePipe } from '../../pipes/image.pipe';
import { DescriptionPipe } from '../../pipes/description.pipe';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-my-list',
  standalone: true,
  imports: [CommonModule, ImagePipe, DescriptionPipe],
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.css']
})
export class MyListComponent implements OnInit {
  @Input() videoContent: any[] = [];

  ngOnInit(): void {
    console.log('Video Content:', this.videoContent); // Debugging statement
  }

  constructor(private router: Router) {}

  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    const searchTerm = target.value.trim().toLowerCase();
    if (searchTerm) {
      const storedMovies = localStorage.getItem('savedMovies');
      if (storedMovies) {
        this.videoContent = JSON.parse(storedMovies).filter((movie: { original_title: string; }) =>
          movie.original_title.toLowerCase().includes(searchTerm)
        );
      }
    } else {
      const storedMovies = localStorage.getItem('savedMovies');
      if (storedMovies) {
        this.videoContent = JSON.parse(storedMovies);
      }
    }
  }

  removeMovie(movieId: string): void {
    const storedMovies = localStorage.getItem('savedMovies');
    if (storedMovies) {
      const movies = JSON.parse(storedMovies).filter((movie: { id: string; }) => movie.id !== movieId);
      localStorage.setItem('savedMovies', JSON.stringify(movies));
      this.videoContent = movies;
    }
  }

  preventSubmit(event: Event): void {
    event.preventDefault();
  }

  preventEnter(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    if (keyboardEvent.key === 'Enter') {
      keyboardEvent.preventDefault();
    }
  }
  
  navigateToDetail(movieId: number): void {
    this.router.navigate(['/detail', movieId]);
  }
} 