import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreenhouseSelectorComponent } from './greenhouse-selector.component';

describe('GreenhouseSelectorComponent', () => {
  let component: GreenhouseSelectorComponent;
  let fixture: ComponentFixture<GreenhouseSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GreenhouseSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GreenhouseSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
