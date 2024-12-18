import { Component, Input, Output, OnInit, EventEmitter, inject, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { NonNullableFormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

import { Pet } from '../../model/pet';
import { ListPipe } from '../../pipes/list.pipe';
import { Select } from '../../model/select';
import { Status } from '../../enums/status';

@Component({
  selector: 'app-pets-list',
  standalone: true,
  imports: [
    AsyncPipe,
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
export class PetsListComponent implements OnInit {
  @Input({required: true})
  pets = new Observable<Pet[]>();

  @Input({required: true})
  searchname = new Observable<string | null>();

  @Input({required: true})
  searchstatuses: string | null = Status.Available;

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

  displayedColumns: string[] = ['id', 'category', 'name', 'photoUrls', 'tags', 'status', 'actions'];
  dataSource = new MatTableDataSource<Pet>();

  formBuilder = inject(NonNullableFormBuilder);
  dialog = inject(MatDialog);

  statuses: Select[] = [
    {value: Status.Available, viewValue: Status.Available},
    {value: Status.Pending, viewValue: Status.Pending},
    {value: Status.Sold, viewValue: Status.Sold},
  ];

  ngOnInit(): void {
    this.pets.subscribe(
      (pets) => {
        this.dataSource = new MatTableDataSource(pets);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;   
      }
    )
  }

  //TODO: Dodaj Unsubscribe!

  name: string = '';

  form = this.formBuilder.group({
    searchname: [
      this.name,
    ], 
    searchstatuses: [
      this.searchstatuses as string
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

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  onChangeName(){
    this.changeSearchName.emit(this.form.controls['searchname'].value);
  }

  onChangeStatuses(event: MatSelectChange): void {
    this.changeSearchStatuses.emit(this.form.controls['searchstatuses'].value);
  }
}
