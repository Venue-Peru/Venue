import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDiscriminatorsWidgetComponent } from './main-discriminators-widget.component';

describe('MainDiscriminatorsWidgetComponent', () => {
  let component: MainDiscriminatorsWidgetComponent;
  let fixture: ComponentFixture<MainDiscriminatorsWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainDiscriminatorsWidgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainDiscriminatorsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
