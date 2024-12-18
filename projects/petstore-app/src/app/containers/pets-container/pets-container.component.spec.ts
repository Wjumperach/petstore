import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetsContainerComponent } from './pets-container.component';

describe('PetsContainerComponent', () => {
  let component: PetsContainerComponent;
  let fixture: ComponentFixture<PetsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetsContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PetsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
