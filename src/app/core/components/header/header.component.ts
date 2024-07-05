import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private router: Router) {}
  @Input({ required: true }) userImg: string = '';
  @Input({ required: true }) userName: string = '';

  navList = ["Home", "Movies", "My List"];

  toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    if (menu) {
      menu.classList.toggle('hidden');
    }
  }

  navigateTo(item: string) {
    const formattedItem = item.toLowerCase().replace(/ /g, '_');
    this.router.navigate([`/${formattedItem}`]);
  }
}
