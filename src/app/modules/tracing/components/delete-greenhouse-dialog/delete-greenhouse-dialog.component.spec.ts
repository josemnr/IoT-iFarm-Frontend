import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteGreenhouseDialogComponent } from './delete-greenhouse-dialog.component';

describe('DeleteGreenhouseDialogComponent', () => {
  let component: DeleteGreenhouseDialogComponent;
  let fixture: ComponentFixture<DeleteGreenhouseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteGreenhouseDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteGreenhouseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
