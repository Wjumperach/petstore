import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetConfirmationDialogComponent } from './pet-confirmation-dialog.component';

describe('PetConfirmationDialogComponent', () => {
  let component: PetConfirmationDialogComponent;
  let fixture: ComponentFixture<PetConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetConfirmationDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PetConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
