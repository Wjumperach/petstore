import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { ReactiveFormsModule, NonNullableFormBuilder, Validators, FormArray } from '@angular/forms';
import { MatDialogModule, MatDialogClose, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule, MatSelectChange } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormGroup } from '@angular/forms';

import { Select } from '../../model/select';
import { Pet } from '../../model/pet';
import { Category } from '../../model/category';
import { Tag } from '../../model/tag';
import { Status } from '../../enums/status';
import { SanitizeService } from '../../services/sanitize.service';

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
  private _dialogRef = inject(MatDialogRef<PetsListItemComponent>);
  private _formBuilder = inject(NonNullableFormBuilder);
  private _sanitizeService = inject(SanitizeService);

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

  form = this._formBuilder.group({
    categoryid: [
      this.categoryid
    ],
    name: [
      this.name as string | null,
      {
        validators: [ Validators.required ]
      }
    ],
    photoUrls: this._formBuilder.array(this.data.pet.photoUrls?.map((url: string) => this.createPhotoUrl(url)) ?? []),
    tags: this._formBuilder.array(this.data.pet.tags.map((tag: Tag) => this.createTag(tag))),
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

    let pet = {
      id: this.id,
      category: this.category,
      name: this.form.controls['name'].value,
      photoUrls: (this.form.get('photoUrls') as FormArray).value,
      tags: (this.form.get('tags') as FormArray).value,
      status: this.form.controls['status'].value,
    } as Pet;
    pet = this._sanitizeService.sanitize(pet);
    this._dialogRef.close(pet);
  }

  // TODO: Dodaj walidatory na przykład numeryczne
  addPhotoUrl(): void {
    const photoUrlForm = this._formBuilder.group({
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
    return this._formBuilder.group({
      url: [
        url,
        Validators.required
      ]
    });
  }

  addTag(): void {
    const tagForm = this._formBuilder.group({
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
    return this._formBuilder.group({
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
}
