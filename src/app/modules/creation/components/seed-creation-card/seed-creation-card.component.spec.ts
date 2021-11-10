import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeedCreationCardComponent } from './seed-creation-card.component';

describe('SeedCreationCardComponent', () => {
  let component: SeedCreationCardComponent;
  let fixture: ComponentFixture<SeedCreationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeedCreationCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeedCreationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
