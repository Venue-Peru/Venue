import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostVisitorComponent } from './host-visitor.component';

describe('HostVisitorComponent', () => {
  let component: HostVisitorComponent;
  let fixture: ComponentFixture<HostVisitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostVisitorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostVisitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
