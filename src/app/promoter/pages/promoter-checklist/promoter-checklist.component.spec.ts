import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoterChecklistComponent } from './promoter-checklist.component';

describe('PromoterChecklistComponent', () => {
  let component: PromoterChecklistComponent;
  let fixture: ComponentFixture<PromoterChecklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PromoterChecklistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromoterChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
