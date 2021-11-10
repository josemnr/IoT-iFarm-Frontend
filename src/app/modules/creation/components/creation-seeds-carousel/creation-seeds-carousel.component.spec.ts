import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationSeedsCarouselComponent } from './creation-seeds-carousel.component';

describe('CreationSeedsCarouselComponent', () => {
  let component: CreationSeedsCarouselComponent;
  let fixture: ComponentFixture<CreationSeedsCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreationSeedsCarouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationSeedsCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
