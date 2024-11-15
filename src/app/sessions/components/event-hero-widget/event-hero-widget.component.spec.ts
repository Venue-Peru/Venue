import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventHeroWidgetComponent } from './event-hero-widget.component';

describe('EventHeroWidgetComponent', () => {
  let component: EventHeroWidgetComponent;
  let fixture: ComponentFixture<EventHeroWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventHeroWidgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventHeroWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
