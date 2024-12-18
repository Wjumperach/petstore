import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';

import { routes } from './app.routes';
import { petsReducer } from './ngrx/reducers/pets.reducer';
import { PetsEffects } from './ngrx/effects/pets.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideStore({ PetsStore: petsReducer }),
    provideEffects(PetsEffects),
    importProvidersFrom(HttpClientModule),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
  ]
};
