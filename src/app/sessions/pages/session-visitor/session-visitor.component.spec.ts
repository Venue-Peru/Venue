import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionVisitorComponent } from './session-visitor.component';

describe('SessionVisitorComponent', () => {
  let component: SessionVisitorComponent;
  let fixture: ComponentFixture<SessionVisitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SessionVisitorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionVisitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
