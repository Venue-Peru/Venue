import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEditFieldsComponent } from './profile-edit-fields.component';

describe('ProfileEditFieldsComponent', () => {
  let component: ProfileEditFieldsComponent;
  let fixture: ComponentFixture<ProfileEditFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileEditFieldsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileEditFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
