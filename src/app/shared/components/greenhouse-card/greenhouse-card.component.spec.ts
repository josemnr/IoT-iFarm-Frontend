import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreenhouseCardComponent } from './greenhouse-card.component';

describe('GreenhouseCardComponent', () => {
  let component: GreenhouseCardComponent;
  let fixture: ComponentFixture<GreenhouseCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GreenhouseCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GreenhouseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
