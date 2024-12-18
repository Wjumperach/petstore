import { createReducer, on } from '@ngrx/store';

import { Pet } from '../../model/pet';
//import { PetsActions } from '../actions/pets.actions';
import {
  LoadPetsActions,
  //SearchPetsActions,
  AddPetActions,
  UpdatePetActions,
  DeletePetActions,
  SetSearchName,
  SetSearchStatuses
} from '../actions/pets.actions';
import { Status } from '../../enums/status';

export const petsFeatureKey = 'PetsStore';

export interface PetState {
  pets: Pet[];
  loading: boolean;
  errormessage: string;
  searchname: string;
  searchstatuses: string; //string[]
}

export const initialState: PetState = {
  pets: [],
  loading: false,
  errormessage: '',
  searchname: '',
  searchstatuses: Status.Available
};

export const petsReducer = createReducer(
  initialState,

  on(LoadPetsActions.loadPets, (state) => {
    return {
      ...state,
      loading: true
    }
  }),

  on(LoadPetsActions.loadPetsSuccess, (state, action) => {
    return {
      ...state,
      pets: action.pets,
      loading: false,
      error: ''
    }
  }),

  on(LoadPetsActions.loadPetsError, (state, action) => {
    return {
      ...state,
      pets: [],
      loading: false,
      error: action.error
    }
  }),

  //on(SearchPetsActions.searchPets, (state) => {
  //  return {
  //    ...state,
  //    loading: true
  //  }
  //}),

  //on(SearchPetsActions.searchPetsSuccess, (state, action) => {
  //  return {
  //    ...state,
  //    pets: action.pets,
  //    loading: false,
  //    error: ''
  //  }
  //}),

  //on(SearchPetsActions.searchPetsError, (state, action) => {
  //  return {
  //    ...state,
  //    pets: [],
  //    loading: false,
  //    errormessage: action.error
  //  }
  //}),

  on(AddPetActions.addPet, (state) => {
    return {
      ...state,
      loading: true
    }
  }),

  on(AddPetActions.addPetSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      errormessage: ''
    }
  }),

  on(AddPetActions.addPetError, (state, action) => {
    return {
      ...state,
      loading: false,
      errormessage: action.message
    }
  }),

  on(UpdatePetActions.updatePet, (state) => {
    return {
      ...state,
      loading: true
    }
  }),

  on(UpdatePetActions.updatePetSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      errormessage: ''
    }
  }),

  on(UpdatePetActions.updatePetError, (state, action) => {
    return {
      ...state,
      loading: false,
      errormessage: action.message
    }
  }),

  on(DeletePetActions.deletePet, (state) => {
    return {
      ...state,
      loading: true
    }
  }),

  on(DeletePetActions.deletePetSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      errormessage: ''
    }
  }),

  on(DeletePetActions.deletePetError, (state, action) => {
    return {
      ...state,
      loading: false,
      errormessage: action.message
    }
  }),

  on(SetSearchName, (state, action) => {
    return {
      ...state,
      searchname: action.searchname,
    }
  }),

  on(SetSearchStatuses, (state, action) => {
    return {
      ...state,
      searchstatuses: action.searchstatuses,
    }
  }),
);

