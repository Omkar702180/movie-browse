import { Component, NgModule, OnInit } from '@angular/core';
import { HeaderComponent } from '../../core/components/header/header.component';
import { FooterComponent } from '../../core/components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { DetailComponent } from '../../shared/components/detail/detail.component';

@Component({
  selector: 'app-singledata',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, DetailComponent],
  templateUrl: './singledata.component.html',
  styleUrl: './singledata.component.css'
})
export class SingledataComponent  implements OnInit {
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
  }
  constructor() {
    const user = JSON.parse(sessionStorage.getItem('loggedInUser')!);
    if (user) {
      this.name = user.name;
      this.userProfileImg = user.picture;
    }
  }
}