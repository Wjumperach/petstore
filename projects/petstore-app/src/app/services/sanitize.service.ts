import { Injectable, inject, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormArray } from '@angular/forms';

import { Pet } from '../model/pet';
import { PhotoUrl } from '../model/photourl';
import { Tag } from '../model/tag';

@Injectable({
  providedIn: 'root'
})
export class SanitizeService {
  private sanitizer = inject(DomSanitizer);

  sanitize(pet: Pet): Pet{
    //TODO: Zrób kopiowanie

    const output = {
      id: pet.id,
      category: pet.category,
      name: this.sanitizeName(pet.name),
      photoUrls: pet.photoUrls.map((photoUrl: string) => this.sanitizeUrl(photoUrl)),
      tags: pet.tags.map((tag: Tag) => this.sanitizeTag(tag)),
      status: this.sanitizeStatus(pet.status),
    } as Pet;

    return output;
  }

  private sanitizeName(name: string | null): string {
    if (name) {
      return this.sanitizer.sanitize(SecurityContext.HTML, name) ?? '';
    }
    return '';
  }

  private sanitizeUrl(url: string): string {
    return this.sanitizer.sanitize(SecurityContext.URL, url) ?? '';
  }

  private sanitizeTag(tag: Tag): Tag {
    {
      return {
        id: tag.id,
        name: this.sanitizer.sanitize(SecurityContext.HTML, tag.name) ?? ''
      }
    }
  }

  private sanitizeStatus(status: string): string {
    if (status) {
      return this.sanitizer.sanitize(SecurityContext.HTML, status) ?? '';
    }
    return '';
  }
}
