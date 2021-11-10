import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreenhouseCreationCardComponent } from './greenhouse-creation-card.component';

describe('GreenhouseCreationCardComponent', () => {
  let component: GreenhouseCreationCardComponent;
  let fixture: ComponentFixture<GreenhouseCreationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GreenhouseCreationCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GreenhouseCreationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
