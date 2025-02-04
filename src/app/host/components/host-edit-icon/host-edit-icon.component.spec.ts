import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostEditIconComponent } from './host-edit-icon.component';

describe('HostEditIconComponent', () => {
  let component: HostEditIconComponent;
  let fixture: ComponentFixture<HostEditIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostEditIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostEditIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
