// login.component.ts
declare var google: any;

import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    if (typeof google !== 'undefined') {
      google.accounts.id.initialize({
        client_id: '674632375346-q1136qlam8hajoadkbgr7gf8ghmdn441.apps.googleusercontent.com',
        callback: (resp: any) => this.handleLogin(resp)
      });

      google.accounts.id.renderButton(document.getElementById("google-btn"), {
        theme: 'filled_blue',
        size: 'large',
        shape: 'rectangle',
        width: 350
      });
    }
  }

  private decodeToken(token: string) {
    return JSON.parse(atob(token.split(".")[1]));
  }

  handleLogin(response: any) {
    if (response) {
      // Decode the token
      const payLoad = this.decodeToken(response.credential);
      if (typeof window !== 'undefined') {
        // Store in session
        sessionStorage.setItem("loggedInUser", JSON.stringify(payLoad));
      }
      // Navigate to home/browse
      this.router.navigate(['browse']).then(() => {
        this.cdr.detectChanges();
        // Reload the page after navigation
        window.location.reload();
      });
    }
  }
}