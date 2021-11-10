import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeedCreationDialogComponent } from './seed-creation-dialog.component';

describe('SeedCreationDialogComponent', () => {
  let component: SeedCreationDialogComponent;
  let fixture: ComponentFixture<SeedCreationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeedCreationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeedCreationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
