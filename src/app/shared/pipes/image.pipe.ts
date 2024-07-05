declare var google: any;
import { Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';

@Pipe({
  name: 'image',
  standalone: true
})
export class ImagePipe implements PipeTransform {
    transform(value: any, args?: any): any {
        return `http://image.tmdb.org/t/p/w500/${value}`
    }
}