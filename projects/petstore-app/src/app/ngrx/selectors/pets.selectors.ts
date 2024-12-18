import { createFeatureSelector, createSelector } from '@ngrx/store';

import { PetState } from '../reducers/pets.reducer';
import { Pet } from '../../model/pet';

export const getPetsStore = createFeatureSelector<PetState>("PetsStore");

export const selectPets = createSelector(getPetsStore, (state) => state.pets);
export const selectLoading = createSelector(getPetsStore, (state) => state.loading);
export const selectErrorMessage = createSelector(getPetsStore, (state) => state.errormessage);
export const selectSearchName = createSelector(getPetsStore, (state) => state.searchname);
export const selectSearchStatuses = createSelector(getPetsStore, (state) => state.searchstatuses);

export const selectSearchPets = createSelector(
    selectPets,
    selectSearchName,
    selectSearchStatuses,
    (pets: Pet[], name: string, statuses: string) => {
        console.log(name);
        console.log(statuses);
        return name === '' ? pets : pets.filter((pet: Pet) => pet.name?.includes(name) && statuses.includes(pet.status))
    }
  );
