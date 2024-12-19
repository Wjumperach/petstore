import { createActionGroup, createAction, props, emptyProps } from '@ngrx/store';

import { Pet } from '../../model/pet';

export const LoadPetsActions = createActionGroup({
  source: 'Pets',
  events: {
    'Load pets': emptyProps(),
    'Load pets success': props<{ pets: Pet[] }>(),
    'Load pets error': props<{ error: string }>(),
  }
});

export const AddPetActions = createActionGroup({
    source: 'Pets',
    events: {
      'Add pet': props<{ pet: Pet }>(),
      'Add pet success': emptyProps(),
      'Add pet error': props<{ message: string }>(),
    }
  });

export const UpdatePetActions = createActionGroup({
    source: 'Pets',
    events: {
      'Update pet': props<{ pet: Pet }>(),
      'Update pet success': emptyProps(),
      'Update pet error': props<{ message: string }>(),
    }
  });

export const DeletePetActions = createActionGroup({
    source: 'Pets',
    events: {
      'Delete pet': props<{ pet: Pet }>(),
      'Delete pet success': emptyProps(),
      'Delete pet error': props<{ message: string }>(),
    }
  });

export const OpenDialogActions = createActionGroup({
    source: 'Dialog',
    events: {
        'Open dialog': props<{ dialogtype: number, message: string }>(),
        'Dialog closed': emptyProps()
    }
});

export const SetSearchName = createAction('[Search] Set search name', props<{ searchname: string }>());
export const SetSearchStatuses = createAction('[Search] Set search statuses', props<{ searchstatuses: string }>());
