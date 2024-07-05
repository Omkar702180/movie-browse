import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../core/components/header/header.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../core/components/footer/footer.component';
import { MyListComponent } from '../../shared/components/my-list/my-list.component';

@Component({
  selector: 'app-saved',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    MyListComponent,
    FooterComponent,
  ],
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.css']
})
export class SavedComponent implements OnInit {
  name!: string;
  userProfileImg!: string;
  email!: string;
  popularMovies: any[] = [];

  ngOnInit(): void {
    const user = JSON.parse(sessionStorage.getItem('loggedInUser')!);
    if (user) {
      this.name = user.name;
      this.userProfileImg = user.picture;
      this.email = user.email;
    }

    this.loadSavedMovies();
  }

  loadSavedMovies() {
    const storedMovies = localStorage.getItem('savedMovies');
    if (storedMovies) {
      this.popularMovies = JSON.parse(storedMovies);
      console.log('Loaded saved movies:', this.popularMovies); // Debugging statement
    } else {
      console.log('No saved movies found in localStorage'); // Debugging statement
    }
  }
}