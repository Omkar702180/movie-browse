import { NgFor, NgIf } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  HostListener,
} from '@angular/core';
import Swiper from 'swiper';
import { IVideoContent } from '../../models/video-content.interface';
import { DescriptionPipe } from '../../pipes/description.pipe';
import { ImagePipe } from '../../pipes/image.pipe';
import { Router } from '@angular/router'; // Import Router


@Component({
  selector: 'app-movie-carousel', 
  standalone: true,
  imports: [NgFor, NgIf, DescriptionPipe, ImagePipe],
  templateUrl: './movie-carousel.component.html',
  styleUrls: ['./movie-carousel.component.css'],
})
export class MovieCarouselComponent implements OnInit, AfterViewInit {
  @Input() videoContent: IVideoContent[] = [];
  @Input() title!: string;
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;
  selectedContent: string | null = null;
  isMobileView: boolean = false;

  constructor(private router: Router) {} // Inject Router

  ngOnInit(): void {}

  @HostListener('window:resize')
  checkView() {
    this.isMobileView = window.innerWidth <= 599;
  }

  ngAfterViewInit(): void {
    if (this.swiperContainer && this.swiperContainer.nativeElement) {
      this.initSwiper();
      this.checkView();
    }
  }
  
  private initSwiper() {
    if (this.swiperContainer && this.swiperContainer.nativeElement) {
      new Swiper(this.swiperContainer.nativeElement, {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 10,
        centeredSlides: true,
        loop: true,
        navigation: false,
        pagination: false,
        breakpoints: {
          600: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 10,
            centeredSlides: true,
          },
          900: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 15,
            centeredSlides: true,
          },
          1200: {
            slidesPerView: 4,
            slidesPerGroup: 4,
            spaceBetween: 20,
            centeredSlides: false,
          },
          1500: {
            slidesPerView: 5,
            slidesPerGroup: 5,
            spaceBetween: 25,
            centeredSlides: false,
          },
          1800: {
            slidesPerView: 5,
            slidesPerGroup: 5,
            spaceBetween: 30,
            centeredSlides: false,
          },
        },
      });
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