import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'linkReduce'
})
export class LinkReducePipe implements PipeTransform {

  transform(value: string, maxLength: number = 20): string {
    // Logic to reduce the length of the link
    if (value.length <= maxLength) {
      return value;
    } else {
      return value.substr(0, maxLength) + '...';
    }
  }
}
