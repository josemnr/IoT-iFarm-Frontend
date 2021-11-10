import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationGreenhousesCarouselComponent } from './creation-greenhouses-carousel.component';

describe('CreationGreenhousesCarouselComponent', () => {
  let component: CreationGreenhousesCarouselComponent;
  let fixture: ComponentFixture<CreationGreenhousesCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreationGreenhousesCarouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationGreenhousesCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
