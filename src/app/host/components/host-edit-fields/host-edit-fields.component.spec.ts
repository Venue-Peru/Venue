import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostEditFieldsComponent } from './host-edit-fields.component';

describe('HostEditFieldsComponent', () => {
  let component: HostEditFieldsComponent;
  let fixture: ComponentFixture<HostEditFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostEditFieldsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostEditFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
