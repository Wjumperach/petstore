import { TestBed } from '@angular/core/testing';

import { PetsStateService } from './petsstate.service';

describe('PetsstateServiceService', () => {
  let service: PetsStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetsStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
