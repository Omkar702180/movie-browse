declare var google: any;
import { Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';

@Pipe({
  name: 'description',
  standalone: true
})
export class DescriptionPipe implements PipeTransform {
    transform(value: string, args?: number): any {
        return `${value.substring(0, args)}...`;
    }
}