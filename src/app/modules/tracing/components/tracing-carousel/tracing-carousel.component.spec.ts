import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TracingCarouselComponent } from './tracing-carousel.component';

describe('TracingCarouselComponent', () => {
  let component: TracingCarouselComponent;
  let fixture: ComponentFixture<TracingCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TracingCarouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TracingCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
