import { Component, inject, ChangeDetectionStrategy, SecurityContext } from '@angular/core';
import { ReactiveFormsModule, NonNullableFormBuilder, Validators, FormArray } from '@angular/forms';
import { MatDialogModule, MatDialogClose, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule, MatSelectChange } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

import { Select } from '../../model/select';
import { Category } from '../../model/category';
import { PhotoUrl } from '../../model/photourl';
import { Tag } from '../../model/tag';
import { Status } from '../../enums/status';

@Component({
  selector: 'app-pets-list-item',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogClose,
    MatIconModule
  ],
  templateUrl: './pets-list-item.component.html',
  styleUrl: './pets-list-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PetsListItemComponent {
  dialogRef = inject(MatDialogRef<PetsListItemComponent>);
  formBuilder = inject(NonNullableFormBuilder);

  // TODO: Przenieść do osobnej usługi
  private sanitizer = inject(DomSanitizer);

  categories: Select[] = [
    {value: "0", viewValue: "string"},
    {value: "1", viewValue: "Dog"},
    {value: "100", viewValue: "Dinosaur"},
  ];

  data = inject(MAT_DIALOG_DATA);

  id = this.data.pet.id;
  categoryid: string = '' + this.data.pet.category?.id;
  category: Category | null = this.data.pet.category;
  name: string | null = this.data.pet.name;
  status = this.data.pet.status;

  statuses: Select[] = [
    {value: Status.Available, viewValue: Status.Available},
    {value: Status.Pending, viewValue: Status.Pending},
    {value: Status.Sold, viewValue: Status.Sold},
  ];

  form = this.formBuilder.group({
    categoryid: [
      this.categoryid
    ],
    name: [
      this.name as string | null,
      {
        validators: [ Validators.required ]
      }
    ],
    photoUrls: this.formBuilder.array(this.data.pet.photoUrls?.map((url: string) => this.createPhotoUrl(url)) ?? []),
    tags: this.formBuilder.array(this.data.pet.tags.map((tag: Tag) => this.createTag(tag))),
    status: [
      this.status,
      {
        validators: [ Validators.required ]
      }
    ]
  });

  get photoUrls() {
    return this.form.controls["photoUrls"] as FormArray;
  }

  get tags() {
    return this.form.controls["tags"] as FormArray;
  }

  selectedCategory(event: MatSelectChange): void {
    this.category = {
      id: event.value,
      name: event.source.triggerValue
    };
  }

  closeDialog(): void{
    if (!this.form.valid) {
      return;
    }

    //let photoUrls = this.form.controls['photoUrls'].value;
    //photoUrls = photoUrls.length ? photoUrls.trim().split(/[\r\n]+/) : [];

    // TODO: Popraw nazwy

    const arrayControl1 = this.form.get('photoUrls') as FormArray;
    const photoUrls = arrayControl1.value.map((photoUrl: PhotoUrl) => this.sanitizeUrl(photoUrl.url));

    const arrayControl = this.form.get('tags') as FormArray;
    const tags = arrayControl.value.map((tag: Tag) => this.sanitizeTag(tag));

    const pet = {
      id: this.id,
      category: this.category,
      name: this.sanitizeName(this.form.controls['name'].value),
      photoUrls: photoUrls,
      tags: tags,
      status: this.sanitizeStatus(this.form.controls['status'].value),
    }
    this.dialogRef.close(pet);
  }

  // TODO: Dodaj walidatory na przykład numeryczne
  addPhotoUrl(): void {
    const photoUrlForm = this.formBuilder.group({
      url: [
        '',
        Validators.required
      ]
    });

    this.photoUrls.push(photoUrlForm);
  }

  removePhotoUrl(index: number) {
    this.photoUrls.removeAt(index);
  }

  createPhotoUrl(url: string): FormGroup {
    return this.formBuilder.group({
      url: [
        url,
        Validators.required
      ]
    });
  }

  addTag(): void {
    const tagForm = this.formBuilder.group({
      id: [
        0,
        Validators.required
      ],
      name: [
        '',
        Validators.required
      ]
    });

    this.tags.push(tagForm);
  }

  removeTag(index: number) {
    this.tags.removeAt(index);
  }

  createTag(tag: Tag): FormGroup {
    return this.formBuilder.group({
      id: [
        tag.id,
        Validators.required
      ],
      name: [
        tag.name,
        Validators.required
      ]
    });
  }

  sanitizeName(name: string | null): string {
    if (name) {
      return this.sanitizer.sanitize(SecurityContext.HTML, name) ?? '';
    }
    return '';
  }

  sanitizeUrl(url: string): string {
    return this.sanitizer.sanitize(SecurityContext.URL, url) ?? '';
  }

  sanitizeTag(tag: Tag): Tag {
    {
      return {
        id: tag.id,
        name: this.sanitizer.sanitize(SecurityContext.HTML, tag.name) ?? ''
      }
    }
  }

  sanitizeStatus(status: string): string {
    if (status) {
      return this.sanitizer.sanitize(SecurityContext.HTML, status) ?? '';
    }
    return '';
  }
}
