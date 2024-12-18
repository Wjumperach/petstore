import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Pet } from '../model/pet';
import { PetState } from '../ngrx/reducers/pets.reducer';
import {
  selectLoading,
  selectErrorMessage,
  selectSearchName,
  selectSearchStatuses,
  selectSearchPets,
} from '../ngrx/selectors/pets.selectors';
import {
  LoadPetsActions,
  AddPetActions,
  UpdatePetActions,
  DeletePetActions,
  SetSearchName,
  SetSearchStatuses
} from '../ngrx/actions/pets.actions';

@Injectable({
  providedIn: 'root'
})
export class PetsStateService {
  store = inject(Store<PetState>);

  loadPets(): void {
    this.store.dispatch(LoadPetsActions.loadPets());
    this.store.select(selectLoading);
    this.store.select(selectErrorMessage);
    this.store.select(selectSearchName);
    this.store.select(selectSearchStatuses);
  }

  searchPets(): void {
    this.store.select(selectSearchPets);
  }

  pets = this.store.select(selectSearchPets);
  loading = this.store.select(selectLoading);
  errorMessage = this.store.select(selectErrorMessage);
  searchName = this.store.select(selectSearchName);
  searchStatuses = this.store.select(selectSearchStatuses);

  setSearchName(searchname: string): void {
    this.store.dispatch(SetSearchName({searchname}));
  }

  setSearchStatuses(searchstatuses: string): void {
    this.store.dispatch(SetSearchStatuses({searchstatuses}));
    this.store.dispatch(LoadPetsActions.loadPets());
  }

  addPet(pet: Pet): void{
    this.store.dispatch(AddPetActions.addPet({ pet }));
  }

  updatePet(pet: Pet): void{
    this.store.dispatch(UpdatePetActions.updatePet({ pet }));
  }

  deletePet(pet: Pet): void{
    this.store.dispatch(DeletePetActions.deletePet({ pet }));
  }
}
