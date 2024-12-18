import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { PetsListComponent } from '../../components/pets-list/pets-list.component';
import { PetsStateService } from '../../services/petsstate.service';
import { Pet } from '../../model/pet';
import { PetsListItemComponent } from '../../components/pets-list-item/pets-list-item.component';
import { PetConfirmationDialogComponent } from '../../components/pet-confirmation-dialog/pet-confirmation-dialog.component';

@Component({
  selector: 'app-pets-container',
  standalone: true,
  imports: [ CommonModule, AsyncPipe, MatProgressSpinnerModule, PetsListComponent, AsyncPipe ],
  templateUrl: './pets-container.component.html',
  styleUrl: './pets-container.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PetsContainerComponent implements OnInit {
  private _petsStateService = inject(PetsStateService);
  pets = this._petsStateService.pets;
  loading = this._petsStateService.loading;
  errorMessage = this._petsStateService.errorMessage;
  searchname = this._petsStateService.searchName;
  searchstatuses = this._petsStateService.searchStatuses;

  dialog = inject(MatDialog);

  onAddPet(): void{
    this.addPet();
  }

  onEditPet(pet: Pet): void {
    this.editPet(pet);
  }

  onDeletePet(pet: Pet): void {    
    this.openConfirmationDialog(pet);
  }

  onChangeSearchName(name: string): void {
    this._petsStateService.setSearchName(name);
  }

  onChangeSearchStatuses(statuses: string): void {
    this._petsStateService.setSearchStatuses(statuses);
  }

  ngOnInit(): void {
    this._petsStateService.loadPets();
  }

  // TODO: Połączyć te funkcje
  // TODO: Zrobić jakiegoś buildera
  addPet(): void{
    const pet = {
      id: 8000, // Jakiś autoincrement
      category: null,
      name: '',
      photoUrs: [],
      tags: [],
      status: ''
    }
    const dialogRef = this.dialog.open(PetsListItemComponent, {
      width: '50vw',
      height: '80vh',
      data: {
        pet
      },
    });

    dialogRef.afterClosed().subscribe(pet => {
      this._petsStateService.addPet(pet);
    });
  } 

  editPet(pet: Pet): void{
    const dialogRef = this.dialog.open(PetsListItemComponent, {
      width: '50vw',
      height: '80vh',
      data: {
        pet
      },
    });

    dialogRef.afterClosed().subscribe(pet => {
      if (pet) {
        this._petsStateService.updatePet(pet);
      }
    });
  }

  openConfirmationDialog(pet: Pet): void {
    const dialogRef = this.dialog.open(PetConfirmationDialogComponent, {
      disableClose: false
    });
    dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete?"

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this._petsStateService.deletePet(pet);
      }
    });
  }
}
