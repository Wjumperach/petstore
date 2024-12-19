import { Component, Input, Output, OnInit, OnDestroy, AfterViewInit, EventEmitter, inject, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NonNullableFormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

import { Pet } from '../../model/pet';
import { ListPipe } from '../../pipes/list.pipe';
import { Select } from '../../model/select';
import { Status } from '../../enums/status';
import { FormFieldsNames } from '../consts/pet-form-fields';
import { DefaultSearchFormFieldValues } from '../consts/search-form-fields';

@Component({
  selector: 'app-pets-list',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    ListPipe
  ],
  templateUrl: './pets-list.component.html',
  styleUrl: './pets-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PetsListComponent implements OnInit, OnDestroy, AfterViewInit {
  private _formBuilder = inject(NonNullableFormBuilder);
  private _name: string | undefined = DefaultSearchFormFieldValues.SearchName;
  private _status: string | null = DefaultSearchFormFieldValues.SearchStatus;
  private _destroy$ = new Subject<void>();

  @Input({required: true})
  searchname = new Observable<string | undefined>();

  @Input({required: true})
  searchstatuses = new Observable<string | null>();

  @Input({required: true})
  pets = new Observable<Pet[]>();

  @Output()
  changeSearchName = new EventEmitter<string>();

  @Output()
  changeSearchStatuses = new EventEmitter<string>();

  @Output()
  addPet = new EventEmitter<Pet>();

  @Output()
  editPet = new EventEmitter<Pet>();

  @Output()
  deletePet = new EventEmitter<Pet>();

  @ViewChild(MatSort)
  sort: MatSort | null = null;

  @ViewChild(MatPaginator) 
  paginator: MatPaginator | null = null;

  displayedColumns: string[] = [
    FormFieldsNames.Id,
    FormFieldsNames.Category,
    FormFieldsNames.Name,
    FormFieldsNames.PhotoUrls,
    FormFieldsNames.Tags,
    FormFieldsNames.Status,
    FormFieldsNames.Actions
  ];
  dataSource = new MatTableDataSource<Pet>();

  statuses: Select[] = [
    {value: Status.Available, viewValue: Status.Available},
    {value: Status.Pending, viewValue: Status.Pending},
    {value: Status.Sold, viewValue: Status.Sold},
  ];

  ngOnInit(): void {
    this.pets
      .pipe(takeUntil(this._destroy$)) 
      .subscribe(
        (pets) => {
          this.dataSource = new MatTableDataSource(pets);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;   
        }
      );
    this.searchname
      .pipe(takeUntil(this._destroy$)) 
      .subscribe(
        (name) => {
          this.form.controls['searchname'].setValue(name ?? DefaultSearchFormFieldValues.SearchName);
        }
      )
    this.searchstatuses
      .pipe(takeUntil(this._destroy$)) 
      .subscribe(
        (status) => {
          this.form.controls['searchstatuses'].setValue(status ?? DefaultSearchFormFieldValues.SearchStatus);
        }
      );
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  form = this._formBuilder.group({
    searchname: [
      this._name,
    ], 
    searchstatuses: [
      this._status as string
    ]
  });

  addRow(): void {
    this.addPet.emit();
  }

  editRow(pet: Pet): void {
    this.editPet.emit(pet);
  }

  removeRow(pet: Pet): void {
    this.deletePet.emit(pet);
  }

  onChangeName(){
    this.changeSearchName.emit(this.form.controls['searchname'].value);
  }

  onChangeStatuses(event: MatSelectChange): void {
    this.changeSearchStatuses.emit(this.form.controls['searchstatuses'].value);
  }
}
