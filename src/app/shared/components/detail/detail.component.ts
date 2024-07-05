import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { ImagePipe } from '../../pipes/image.pipe';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from '../../../core/components/header/header.component';
import { FooterComponent } from '../../../core/components/footer/footer.component';

@Component({
  selector: 'app-detail',
  standalone: true,
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  imports: [ImagePipe, CommonModule, HttpClientModule, HeaderComponent, FooterComponent]
})
export class DetailComponent implements OnInit {
  movie: any;

  constructor(private route: ActivatedRoute, private movieService: MovieService) {}

  ngOnInit(): void {
    const movieId = this.route.snapshot.paramMap.get('id');
    if (movieId) {
      this.movieService.getMovieDetails(movieId).subscribe((response: any) => {
        this.movie = response;
      });
    }
  }

  getFormattedGenres(): string {
    if (this.movie && this.movie.genres) {
      return this.movie.genres.map((g: any) => g.name).join(', ');
    }
    return '';
  }

  getFormattedProductionCompanies(): string {
    if (this.movie && this.movie.production_companies) {
      return this.movie.production_companies.map((pc: any) => pc.name).join(', ');
    }
    return '';
  }
}