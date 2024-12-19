import { Injectable, inject, OnDestroy } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Subject, of, takeUntil } from 'rxjs';
import { map, catchError, exhaustMap, withLatestFrom } from 'rxjs/operators';
import { MatDialog, } from '@angular/material/dialog';

import { PetsStateService } from '../../services/petsstate.service';
import { PetsService } from '../../services/pets.service';
import { Pet } from '../../model/pet';
import {
  LoadPetsActions,
  AddPetActions,
  UpdatePetActions,
  DeletePetActions,
  OpenDialogActions
} from '../actions/pets.actions';
import { SuccessDialogComponent } from '../../components/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from '../../components/error-dialog/error-dialog.component';
import { Error } from '../../model/error';

@Injectable()
export class PetsEffects implements OnDestroy {
  private _dialog = inject(MatDialog);
  private _petsStateService = inject(PetsStateService);
  private _petsService = inject(PetsService);
  private _actions$ = inject(Actions);
  private _destroy$: Subject<void> = new Subject<void>();

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  loadPets$ = createEffect(() => this._actions$.pipe(
    ofType(LoadPetsActions.loadPets),
    withLatestFrom(
      this._petsStateService.searchStatuses
    ),
    exhaustMap(([action, status]) => this._petsService.findByStatus(status)
      .pipe(
        map((pets: Pet[]) => LoadPetsActions.loadPetsSuccess({ pets })),
        catchError(error => of(LoadPetsActions.loadPetsError({ error })))
      )),
    )
  );

  addPet$ = createEffect(() => this._actions$.pipe(
    ofType(AddPetActions.addPet),
    exhaustMap((action) => this._petsService.addPet(action.pet)
      .pipe(
        map(() => AddPetActions.addPetSuccess()),
        catchError((error: Error) => of(AddPetActions.addPetError({message: error.message})))
      ))
    )
  );

  addPetSuccess$ = createEffect(() => this._actions$.pipe(
    ofType(AddPetActions.addPetSuccess),
    map(() => OpenDialogActions.openDialog({ dialogtype: 0, message: 'Pet has been added.' })),
  ));

  addPetError$ = createEffect(() => this._actions$.pipe(
    ofType(AddPetActions.addPetError),
    map((payload) => OpenDialogActions.openDialog({ dialogtype: 1, message: payload.message})),
  ));

  updatePet$ = createEffect(() => this._actions$.pipe(
    ofType(UpdatePetActions.updatePet),
    exhaustMap((action) => this._petsService.updatePet(action.pet)
      .pipe(
        map(() => UpdatePetActions.updatePetSuccess()),
        catchError((error: Error) => of(UpdatePetActions.updatePetError({ message: error.message })))
      ))
    )
  );

  updatePetSuccess$ = createEffect(() => this._actions$.pipe(
    ofType(UpdatePetActions.updatePetSuccess),
    map(() => OpenDialogActions.openDialog({ dialogtype: 0, message: 'Pet has been updated.' })),
  ));

  updatePetError$ = createEffect(() => this._actions$.pipe(
    ofType(UpdatePetActions.updatePetError),
    map((payload) => OpenDialogActions.openDialog({ dialogtype: 1, message: payload.message})),
  ));

  deletePet$ = createEffect(() => this._actions$.pipe(
    ofType(DeletePetActions.deletePet),
    exhaustMap((action) => this._petsService.deletePet(action.pet)
      .pipe(
        map(() => DeletePetActions.deletePetSuccess()),
        catchError((error: Error) => of(DeletePetActions.deletePetError({ message: error.message })))
      ))
    )
  );

  deletePetSuccess$ = createEffect(() => this._actions$.pipe(
    ofType(DeletePetActions.deletePetSuccess),
    map(() => OpenDialogActions.openDialog({ dialogtype: 0, message: 'Pet has been deleted.' })),
  ));

  deletePetError$ = createEffect(() => this._actions$.pipe(
    ofType(DeletePetActions.deletePetError),
    map((payload) => OpenDialogActions.openDialog({ dialogtype: 1, message: payload.message})),
  ));

  openDialog$ = createEffect(() => this._actions$.pipe(
      ofType(OpenDialogActions.openDialog),
      takeUntil(this._destroy$),
      exhaustMap(({dialogtype, message}) => {
        if (dialogtype === 0) {
          let dialogRef = this._dialog.open(SuccessDialogComponent);
          dialogRef.componentInstance.message = message;
          return dialogRef.afterClosed();
        }
        let dialogRef = this._dialog.open(ErrorDialogComponent);
        dialogRef.componentInstance.error = message;
        return dialogRef.afterClosed();
      }),
      map(() => {
        //TODO: Dorobić retry
        //if (result === undefined) {
        //  return LoginDialogActions.closed();
        //}
        return LoadPetsActions.loadPets()
      }),
    )
  );
}
