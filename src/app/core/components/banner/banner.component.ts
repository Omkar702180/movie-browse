import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-banner',
  standalone: true,
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnChanges {

  @Input({required: true}) bannerTitle = '';
  @Input() bannerOverview = '';
  @Input() key = 'r_pUE7OcN8w';
  private sanitizer = inject(DomSanitizer);
  videoUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.getVideoUrl(this.key));

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['key'] && changes['key'].currentValue) {
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.getVideoUrl(this.key));
    }
  }

  private getVideoUrl(key: string): string {
    return `https://www.youtube.com/embed/${key}?autoplay=1&mute=1&loop=1&controls=0&modestbranding=1&showinfo=0&rel=0&iv_load_policy=3&playlist=${key}`;
  }
}