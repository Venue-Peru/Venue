import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItMainPageComponent } from './it-main-page.component';

describe('ItMainPageComponent', () => {
  let component: ItMainPageComponent;
  let fixture: ComponentFixture<ItMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItMainPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
