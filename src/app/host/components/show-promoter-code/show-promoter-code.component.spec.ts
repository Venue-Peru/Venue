import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPromoterCodeComponent } from './show-promoter-code.component';

describe('ShowPromoterCodeComponent', () => {
  let component: ShowPromoterCodeComponent;
  let fixture: ComponentFixture<ShowPromoterCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowPromoterCodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowPromoterCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
