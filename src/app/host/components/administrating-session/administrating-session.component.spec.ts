import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratingSessionComponent } from './administrating-session.component';

describe('AdministratingSessionComponent', () => {
  let component: AdministratingSessionComponent;
  let fixture: ComponentFixture<AdministratingSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdministratingSessionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministratingSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
