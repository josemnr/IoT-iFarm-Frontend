import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreenhouseCreationDialogComponent } from './greenhouse-creation-dialog.component';

describe('GreenhouseCreationDialogComponent', () => {
  let component: GreenhouseCreationDialogComponent;
  let fixture: ComponentFixture<GreenhouseCreationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GreenhouseCreationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GreenhouseCreationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
