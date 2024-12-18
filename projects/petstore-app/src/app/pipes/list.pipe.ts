import { Pipe, PipeTransform } from '@angular/core';

import { Tag } from '../model/tag';

@Pipe({
  name: 'list',
  standalone: true,
})
export class ListPipe implements PipeTransform {
  transform(tags: Tag[]): string {
    if (tags) {
      return tags.map((tag) => (tag.name)).join(', ');
    }

    return '';
  }
}